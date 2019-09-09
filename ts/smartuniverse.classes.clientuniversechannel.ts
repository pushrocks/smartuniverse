import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { ClientUniverse } from './';
import { ClientUniverseMessage } from './smartuniverse.classes.clientuniversemessage';

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
  public status: 'subscribed' | 'unsubscribed' = 'unsubscribed';
  private subject = new plugins.smartrx.rxjs.Subject();

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
  public async subscribe(observerArg?: plugins.smartrx.rxjs.Observer<any>) {
    // lets make sure the channel is connected
    if (this.status === 'unsubscribed') {
      const response = await this.clientUniverseRef.smartsocketClient.serverCall<interfaces.ISocketRequest_SubscribeChannel>(
        'subscribeChannel',
        {
          name: this.name,
          passphrase: this.passphrase
        }
      );
      this.status = response.subscriptionStatus;
    }

    if (observerArg) {
      return this.subject.subscribe(observerArg);
    }

  }

  public async emitMessageLocally(messageArg: ClientUniverseMessage) {
    
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
    await this.clientUniverseRef.smartsocketClient.serverCall(
      'processMessage',
      universeMessageToSend
    );
  }
}
