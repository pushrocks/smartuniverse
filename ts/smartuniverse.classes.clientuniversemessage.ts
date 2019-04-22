import * as plugins from './smartuniverse.plugins';

import * as interfaces from './interfaces';

export class ClientUniverseMessage implements interfaces.IUniverseMessage {
  // ======
  // STATIC
  // ======
  public static createMessageFromPayload(messageDescriptor: interfaces.IUniverseMessage) {}

  // ========
  // INSTANCE
  // ========

  public id: string;

  public timestamp: number;
  public smartTimestamp: plugins.smarttime.TimeStamp;

  public messageText: string;
  public passphrase: string;
  public payload: any;
  public payloadStringType;
  public targetChannelName: string;
  constructor(messageArg, payloadArg) {}

  getAsJsonForPayload() {}
}
