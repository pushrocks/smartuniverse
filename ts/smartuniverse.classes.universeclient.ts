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
  
  public sendMessage(message, messagePayload) {
    plugins.smartrequest.post(this.options.serverAddress, {
      requestBody: messagePayload
    })
  }

  public getMessageObservable () {
    
  }
}
