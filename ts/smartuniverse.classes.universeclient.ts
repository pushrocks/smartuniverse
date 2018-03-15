import * as plugins from './smartuniverse.plugins';

import { Observable } from 'rxjs';
import { IServerGetMessagesRequestBody, IServerPutMessageRequestBody } from './smartuniverse.classes.universe'

export interface IClientOptions {
  serverAddress: string
}

export class UniverseClient {
  public options;

  constructor(optionsArg: IClientOptions) {
    this.options = optionsArg;
  }
  
  public async sendMessage(messageArg, payloadArg) {
    const requestBody = {
      message: messageArg,
      payload: payloadArg
    }
    await plugins.smartrequest.post(this.options.serverAddress, {
      requestBody: requestBody
    })
  }

  public getMessageObservable () {
    
  }
}
