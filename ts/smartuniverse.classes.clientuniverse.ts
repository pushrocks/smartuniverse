import * as plugins from './smartuniverse.plugins';

import { Objectmap } from '@pushrocks/lik';
import { Observable } from 'rxjs';
import { Smartsocket, SmartsocketClient } from '@pushrocks/smartsocket';
import * as url from 'url';

import * as interfaces from './interfaces';

import {
  ClientUniverseChannel,
  UniverseMessage
} from './';

export interface IClientOptions {
  serverAddress: string;
}

/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
export class ClientUniverse {
  public options;
  public socketClient: plugins.smartsocket.SmartsocketClient;
  public observableIntake: plugins.smartrx.ObservableIntake<UniverseMessage>;

  public channelCache = new Objectmap<ClientUniverseChannel>();

  constructor(optionsArg: IClientOptions) {
    this.options = optionsArg;
  }

  /**
   * adds a channel to the channelcache
   * TODO: verify channel before adding it to the channel cache
   */
  public async addChannel (channelNameArg: string, passphraseArg: string) {
    const existingChannel = this.getChannel(channelNameArg);

    if (existingChannel) {
      throw new Error('channel exists');
    }

    // lets create the channel
    ClientUniverseChannel.createClientUniverseChannel(
      this,
      channelNameArg,
      passphraseArg
    );
  }

  /**
   * gets a channel from the channelcache
   * @param channelName
   * @param passphraseArg 
   */
  public async getChannel(channelName: string): Promise<ClientUniverseChannel> {
    await this.checkConnection();
    const clientUniverseChannel = this.channelCache.find(channel => {
      return channel.name === channelName;
    })
    return clientUniverseChannel;
  }

  public async sendMessage(messageArg: interfaces.IMessageCreator) {
    const requestBody: interfaces.IUniverseMessage = {
      id: plugins.smartunique.shortId(),
      timestamp: Date.now(),
      passphrase: (await this.getChannel(messageArg.targetChannelName)).passphrase,
      ...messageArg,

    };
    const requestBodyString = JSON.stringify(requestBody);
    // TODO: User websocket connection if available
    const response = await plugins.smartrequest.postJson(`${this.options.serverAddress}/sendmessage` , {
      requestBody: requestBodyString
    });
  }

  public close() {
    this.socketClient.disconnect();
  }

  /**
   * checks the connection towards a universe server
   * since password validation is done through other means, a connection should always be possible
   */
  private async checkConnection(): Promise<void> {
    if (!this.socketClient && !this.observableIntake) {
      const parsedURL = url.parse(this.options.serverAddress);
      this.socketClient = new SmartsocketClient({
        alias: process.env.SOCKET_ALIAS || 'someclient',
        password: 'UniverseClient',
        port: parseInt(parsedURL.port, 10),
        role: 'UniverseClient',
        url: parsedURL.hostname
      });
      this.observableIntake = new plugins.smartrx.ObservableIntake();
      this.socketClient.connect();
    }
  }
}
