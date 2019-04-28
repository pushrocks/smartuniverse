import * as plugins from './smartuniverse.plugins';

import { Objectmap } from '@pushrocks/lik';
import { Observable } from 'rxjs';
import { Smartsocket, SmartsocketClient } from '@pushrocks/smartsocket';
import * as url from 'url';

import * as interfaces from './interfaces';

import { ClientUniverseChannel, UniverseMessage } from './';
import {
  ClientUniverseCache
} from './smartuniverse.classes.clientuniversecache';

export interface IClientOptions {
  serverAddress: string;
}

/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
export class ClientUniverse {
  public options;
  public smartsocketClient: plugins.smartsocket.SmartsocketClient;
  public observableIntake: plugins.smartrx.ObservableIntake<UniverseMessage>;

  public channelStore = new Objectmap<ClientUniverseChannel>();
  public clientUniverseCache = new ClientUniverseCache();

  constructor(optionsArg: IClientOptions) {
    this.options = optionsArg;
  }

  /**
   * adds a channel to the channelcache
   * TODO: verify channel before adding it to the channel cache
   */
  public async addChannel(channelNameArg: string, passphraseArg: string) {
    const existingChannel = await this.getChannel(channelNameArg);

    if (existingChannel) {
      throw new Error('channel exists');
    }

    // lets create the channel
    ClientUniverseChannel.createClientUniverseChannel(this, channelNameArg, passphraseArg);
  }

  /**
   * gets a channel from the channelcache
   * @param channelName
   * @param passphraseArg
   */
  public async getChannel(channelName: string): Promise<ClientUniverseChannel> {
    await this.checkConnection();
    const clientUniverseChannel = this.channelStore.find(channel => {
      return channel.name === channelName;
    });
    return clientUniverseChannel;
  }

  /**
   * remove a a achannel
   * @param messageArg
   */
  public removeChannel(channelNameArg, notifyServer = true) {
    const clientUniverseChannel = this.channelStore.findOneAndRemove(channelItemArg => {
      return channelItemArg.name === channelNameArg;
    });
  }


  /**
   * sends a message towards the server
   * @param messageArg 
   */
  public async sendMessage(messageArg: interfaces.IMessageCreator) {
    await this.checkConnection();
    const requestBody: interfaces.IUniverseMessage = {
      id: plugins.smartunique.shortId(),
      timestamp: Date.now(),
      passphrase: (await this.getChannel(messageArg.targetChannelName)).passphrase,
      ...messageArg
    };
    // TODO: User websocket connection if available
    const response = await plugins.smartrequest.postJson(
      `${this.options.serverAddress}/sendmessage`,
      {
        requestBody
      }
    );
  }

  public close() {
    this.smartsocketClient.disconnect();
  }

  /**
   * checks the connection towards a universe server
   * since password validation is done through other means, a connection should always be possible
   */
  private async checkConnection(): Promise<void> {
    if (!this.smartsocketClient && !this.observableIntake) {
      const parsedURL = url.parse(this.options.serverAddress);
      const socketConfig: plugins.smartsocket.ISmartsocketClientOptions = {
        alias: process.env.SOCKET_ALIAS || 'someclient',
        password: 'UniverseClient',
        port: parseInt(parsedURL.port, 10),
        role: 'UniverseClient',
        url: parsedURL.protocol + '//' + parsedURL.hostname
      };
      console.log(socketConfig);
      this.smartsocketClient = new SmartsocketClient(socketConfig);
      this.observableIntake = new plugins.smartrx.ObservableIntake();

      // lets define some basic actions

      /**
       * should handle a forced unsubscription by the server
       */
      const unsubscribe = new plugins.smartsocket.SocketFunction({
        funcName: 'unsubscribe',
        allowedRoles: [],
        funcDef: async (data: interfaces.IServerUnsubscribeActionPayload) => {
          
        },
      });

      /**
       * should handle a message reception
       */
      const receiveMessage = async () => {

      };

      

      await this.smartsocketClient.connect();
    }
  }
}
