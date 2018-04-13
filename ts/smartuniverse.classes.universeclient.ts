import * as plugins from './smartuniverse.plugins';

import { Observable } from 'rxjs';
import { Smartsocket, SmartsocketClient } from 'smartsocket';
import * as url from 'url';

import {
  IServerGetMessagesRequestBody,
  IServerPutMessageRequestBody
} from './smartuniverse.classes.universe';
import { UniverseMessage } from './smartuniverse.classes.universemessage';

export interface IClientOptions {
  serverAddress: string;
}

/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
export class UniverseClient {
  public options;
  private socketClient: plugins.smartsocket.SmartsocketClient;
  private observableIntake: plugins.smartrx.ObservableIntake<UniverseMessage>;

  constructor(optionsArg: IClientOptions) {
    this.options = optionsArg;
  }

  public async sendMessage(messageArg, payloadArg) {
    const requestBody = {
      message: messageArg,
      payload: payloadArg
    };
    // TODO: User websocket connection if available
    await plugins.smartrequest.post(this.options.serverAddress, {
      requestBody
    });
  }

  public getMessageObservable() {
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
    return this.observableIntake.observable;
  }

  public close() {
    this.socketClient.disconnect();
  }
}
