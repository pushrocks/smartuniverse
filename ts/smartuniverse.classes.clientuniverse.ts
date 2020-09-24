import * as plugins from './smartuniverse.plugins';

import { Observable } from 'rxjs';
import { Smartsocket, SmartsocketClient } from '@pushrocks/smartsocket';
import * as url from 'url';

import * as interfaces from './interfaces';

import { ClientUniverseChannel, ClientUniverseMessage } from './';
import { ClientUniverseCache } from './smartuniverse.classes.clientuniversecache';
import { logger } from './smartuniverse.logging';

export interface IClientOptions {
  serverAddress: string;
  autoReconnect: boolean;
}

/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
export class ClientUniverse {
  public options: IClientOptions;
  public smartsocketClient: plugins.smartsocket.SmartsocketClient;
  public messageRxjsSubject = new plugins.smartrx.rxjs.Subject<ClientUniverseMessage<any>>();
  public clientUniverseCache = new ClientUniverseCache();

  public autoReconnectStatus: 'on' | 'off' = 'off';

  constructor(optionsArg: IClientOptions) {
    this.options = optionsArg;
  }

  /**
   * adds a channel to the channelcache
   * TODO: verify channel before adding it to the channel cache
   */
  public addChannel(channelNameArg: string, passphraseArg: string) {
    const existingChannel = this.getChannel(channelNameArg);

    if (existingChannel) {
      throw new Error('channel exists');
    }

    // lets create the channel
    const clientUniverseChannel = ClientUniverseChannel.createClientUniverseChannel(
      this,
      channelNameArg,
      passphraseArg
    );
    return clientUniverseChannel;
  }

  /**
   * gets a channel from the channelcache
   * @param channelName
   * @param passphraseArg
   */
  public getChannel(channelName: string): ClientUniverseChannel {
    const clientUniverseChannel = this.clientUniverseCache.channelMap.find((channel) => {
      return channel.name === channelName;
    });
    return clientUniverseChannel;
  }

  /**
   * remove a a achannel
   * @param messageArg
   */
  public removeChannel(channelNameArg, notifyServer = true) {
    const clientUniverseChannel = this.clientUniverseCache.channelMap.findOneAndRemove(
      (channelItemArg) => {
        return channelItemArg.name === channelNameArg;
      }
    );
  }

  public async start() {
    if (this.options.autoReconnect) {
      this.autoReconnectStatus = 'on';
    }
    await this.checkConnection();
  }

  public async stop() {
    this.autoReconnectStatus = 'off';
    await this.disconnect('triggered');
  }

  /**
   * checks the connection towards a universe server
   * since password validation is done through other means, a connection should always be possible
   */
  private async checkConnection(): Promise<void> {
    if (!this.smartsocketClient) {
      const parsedURL = url.parse(this.options.serverAddress);
      const socketConfig: plugins.smartsocket.ISmartsocketClientOptions = {
        alias: 'universeclient',
        password: 'UniverseClient',
        port: parseInt(parsedURL.port, 10),
        role: 'UniverseClient',
        url: parsedURL.protocol + '//' + parsedURL.hostname,
      };
      this.smartsocketClient = new SmartsocketClient(socketConfig);

      this.smartsocketClient.eventSubject.subscribe(async (eventArg) => {
        switch (eventArg) {
          case 'disconnected':
            this.disconnect('upstreamEvent');
        }
      });

      // lets define some basic actions

      /**
       * should handle a forced unsubscription by the server
       */
      const socketFunctionUnsubscribe = new plugins.smartsocket.SocketFunction({
        funcName: 'unsubscribe',
        allowedRoles: [],
        funcDef: async (dataArg: interfaces.IServerUnsubscribeActionPayload) => {
          const channel = this.clientUniverseCache.channelMap.find((channelArg) => {
            return channelArg.name === dataArg.name;
          });
          if (channel) {
            channel.unsubscribe();
          }
          return {};
        },
      });

      /**
       * handles message reception
       */
      const socketFunctionProcessMessage = new plugins.smartsocket.SocketFunction<
        interfaces.ISocketRequest_ProcessMessage
      >({
        funcName: 'processMessage',
        allowedRoles: [],
        funcDef: async (messageDescriptorArg) => {
          logger.log('info', 'Got message from server');
          const clientUniverseMessage = ClientUniverseMessage.createMessageFromMessageDescriptor(
            messageDescriptorArg
          );
          this.messageRxjsSubject.next(clientUniverseMessage);

          // lets find the corresponding channel
          const targetChannel = this.getChannel(clientUniverseMessage.targetChannelName);
          if (targetChannel) {
            await targetChannel.emitMessageLocally(clientUniverseMessage);
            return {
              messageStatus: 'ok',
            };
          } else {
            return {
              messageStatus: 'channel not found',
            };
          }
        },
      });

      // add functions
      this.smartsocketClient.addSocketFunction(socketFunctionUnsubscribe);
      this.smartsocketClient.addSocketFunction(socketFunctionProcessMessage);

      await this.smartsocketClient.connect();
      logger.log('info', 'universe client connected successfully');
      await this.clientUniverseCache.channelMap.forEach(async (clientUniverseChannelArg) => {
        await clientUniverseChannelArg.populateSubscriptionToServer();
      });
    }
  }

  private async disconnect(
    reason: 'upstreamEvent' | 'triggered' = 'triggered',
    tryReconnect = false
  ) {
    const instructDisconnect = async () => {
      if (this.smartsocketClient) {
        const smartsocketToDisconnect = this.smartsocketClient;
        this.smartsocketClient = null; // making sure the upstreamEvent does  not interfere
        await smartsocketToDisconnect.disconnect();
      }
    };

    if (reason === 'triggered' && this.smartsocketClient) {
      await instructDisconnect();
    }
    if (this.autoReconnectStatus === 'on' && reason === 'upstreamEvent') {
      await instructDisconnect();
      await plugins.smartdelay.delayForRandom(5000, 20000);
      await this.checkConnection();
    }
  }
}
