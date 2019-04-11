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

  public async sendMessage(messageArg, payloadArg) {
    const requestBody = {
      message: messageArg,
      payload: payloadArg
    };
    // TODO: User websocket connection if available
    await plugins.smartrequest.postJson(this.options.serverAddress, {
      requestBody
    });
  }

  public async getChannel(channelName: string): Promise<ClientUniverseChannel> {
    await this.checkConnection();
    const clientUniverseChannel = await ClientUniverseChannel.createClientUniverseChannel(
      this,
      channelName
    );
    this.channelCache.add(clientUniverseChannel);
    return clientUniverseChannel;
  }

  public close() {
    this.socketClient.disconnect();
  }

  private async checkConnection() {
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
