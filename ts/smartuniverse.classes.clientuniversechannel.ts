import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { ClientUniverse } from './';

export class ClientUniverseChannel implements interfaces.IUniverseChannel {
  // ======
  // STATIC
  // ======
  /**
   * creates a channel and adds it to the cache of clientUniverseArg
   * @param clientUniverseArg
   * @param channelNameArg
   * @param passphraseArg
   */
  public static createClientUniverseChannel(
    clientUniverseArg: ClientUniverse,
    channelNameArg: string,
    passphraseArg: string
  ): ClientUniverseChannel {
    const clientChannel = new ClientUniverseChannel(
      clientUniverseArg,
      channelNameArg,
      passphraseArg
    );
    clientUniverseArg.clientUniverseCache.channelMap.add(clientChannel);
    return clientChannel;
  }

  // ========
  // INSTANCE
  // ========

  // properties
  public name: string;
  public passphrase: string;

  // refs
  public clientUniverseRef: ClientUniverse;

  constructor(clientUniverseArg: ClientUniverse, nameArg: string, passphraseArg: string) {
    this.clientUniverseRef = clientUniverseArg;
    this.name = nameArg;
    this.passphrase = passphraseArg;
  }

  /**
   * subscribes to a channel
   * tells the universe about this instances interest into a channel
   */
  public async subscribe() {
    const serverCallActionName: interfaces.IServerCallActions = 'channelSubscription';
    const serverCallActionPayload: interfaces.IServerCallSubscribeActionPayload = {
      name: this.name,
      passphrase: this.passphrase
    };
    await this.clientUniverseRef.smartsocketClient.serverCall(serverCallActionName, serverCallActionPayload);
  }

  /**
   * sends a message towards the server
   * @param messageArg
   */
  public async sendMessage(messageArg: interfaces.IMessageCreator) {
    await this.clientUniverseRef.checkConnection();
    const universeMessageToSend: interfaces.IUniverseMessage = {
      id: plugins.smartunique.shortId(),
      timestamp: Date.now(),
      passphrase: this.passphrase,
      targetChannelName: this.name,
      messageText: messageArg.messageText,
      payload: messageArg.payload,
      payloadStringType: messageArg.payloadStringType
    };
    await this.clientUniverseRef.smartsocketClient.serverCall('processMessage', universeMessageToSend);
  }
}
