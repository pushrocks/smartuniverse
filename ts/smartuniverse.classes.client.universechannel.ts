import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { ClientUniverse } from '.';
import { ClientUniverseMessage } from './smartuniverse.classes.client.universemessage';
import { ReactionRequest } from './smartuniverse.classes.event.reactionrequest';
import { ReactionResponse } from './smartuniverse.classes.event.reactionresponse';

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
  private subject = new plugins.smartrx.rxjs.Subject<ClientUniverseMessage<any>>();

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
  public subscribe(observingFunctionArg: (messageArg: ClientUniverseMessage<any>) => void) {
    return this.subject.subscribe(
      (messageArg) => {
        observingFunctionArg(messageArg);
      },
      (error) => console.log(error)
    );
  }

  public unsubscribe() {
    // TODO: unsubscribe all users
  }

  public async populateSubscriptionToServer() {
    // lets make sure the channel is connected
    if (this.status === 'unsubscribed') {
      const response = await this.clientUniverseRef.smartsocketClient.serverCall<
        interfaces.ISocketRequest_SubscribeChannel
      >('subscribeChannel', {
        name: this.name,
        passphrase: this.passphrase,
      });
      this.status = response.subscriptionStatus;
    }
  }

  public async emitMessageLocally(messageArg: ClientUniverseMessage<any>) {
    this.subject.next(messageArg);
  }

  /**
   * sends a message towards the server
   * @param messageArg
   */
  public async postMessage(messageArg: interfaces.IMessageCreator) {
    await this.clientUniverseRef.start(); // its ok to call this multiple times
    const universeMessageToSend: interfaces.IUniverseMessage = {
      id: plugins.smartunique.shortId(),
      timestamp: Date.now(),
      passphrase: this.passphrase,
      targetChannelName: this.name,
      messageText: messageArg.messageText,
      payload: messageArg.payload,
    };
    await this.clientUniverseRef.smartsocketClient.serverCall(
      'processMessage',
      universeMessageToSend
    );
  }
}
