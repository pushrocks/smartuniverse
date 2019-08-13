import * as plugins from './smartuniverse.plugins';

import * as interfaces from './interfaces';

export class ClientUniverseMessage implements interfaces.IUniverseMessage {
  // ======
  // STATIC
  // ======
  public static createMessageFromMessageDescriptor(messageDescriptor: interfaces.IUniverseMessage) {
    const clientuniverseMessage = new ClientUniverseMessage(messageDescriptor);
    return clientuniverseMessage;
  }

  // ========
  // INSTANCE
  // ========

  // properties
  public id: string;

  public timestamp: number;
  public smartTimestamp: plugins.smarttime.TimeStamp;
  public messageText: string;
  public passphrase: string;
  public payload: any;
  public payloadStringType;
  public targetChannelName: string;

  constructor(messageArg: interfaces.IUniverseMessage) {
    for (const key of Object.keys(messageArg)) {
      this[key] = messageArg[key];
    }
  }

  /**
   * gets json for payload
   */
  getAsJsonForPayload() {}
}
