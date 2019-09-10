import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { UniverseCache } from './smartuniverse.classes.universecache';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';
import { Universe } from './smartuniverse.classes.universe';

/**
 * enables messages to stay within a certain scope.
 */
export class UniverseChannel {
  // ======
  // STATIC
  // ======

  /**
   * creates new channels
   * @param channelArg the name of the topic
   * @param passphraseArg the secret thats used for a certain topic.
   */
  public static createChannel(
    universeArg: Universe,
    channelNameArg: string,
    passphraseArg: string
  ) {
    const newChannel = new UniverseChannel(universeArg, channelNameArg, passphraseArg);
    universeArg.universeCache.channelMap.add(newChannel);
    return newChannel;
  }

  /**
   * returns boolean wether certain channel exists
   */
  public static async doesChannelExists(universeCacheArg: UniverseCache, channelNameArg: string) {
    const channel = universeCacheArg.channelMap.find(channelArg => {
      return channelArg.name === channelNameArg;
    });
    if (channel) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * a static message authorization function that takes the  UniverseCache
   * (where messages and channels are stored and their lifetime is managed)
   * and the universemessage to find a fitting channel for the message
   * @param universeCacheArg
   * @param universeMessageArg
   */
  public static authorizeAMessageForAChannel(
    universeCacheArg: UniverseCache,
    universeMessageArg: UniverseMessage
  ): UniverseChannel {
    const foundChannel = universeCacheArg.channelMap.find(universeChannel => {
      const result = universeChannel.authenticate(universeMessageArg);
      return result;
    });
    if (foundChannel) {
      universeMessageArg.authenticated = true;
      universeMessageArg.universeChannelList.add(foundChannel);
      plugins.smartlog.defaultLogger.log('ok', 'message authorized');
      return foundChannel;
    } else {
      universeMessageArg.authenticated = false;
      universeMessageArg.universeChannelList.add(universeCacheArg.blackListChannel);
      plugins.smartlog.defaultLogger.log('warn', 'message not valid');
      return null;
    }
  }

  public static getUniverseChannelByName(universeRef: Universe, universeChannelName: string) {
    return universeRef.universeCache.channelMap.find(channelArg => {
      return channelArg.name === universeChannelName;
    });
  }

  // ========
  // INSTANCE
  // ========
  /**
   * the name of the channel
   */
  public name: string;
  public universeRef: Universe;
  private subject = new plugins.smartrx.rxjs.Subject<UniverseMessage>();

  /**
   * the passphrase for the channel
   */
  public passphrase: string;

  constructor(universeArg: Universe, channelNameArg: string, passphraseArg: string) {
    this.universeRef = universeArg;
    this.name = channelNameArg;
    this.passphrase = passphraseArg;
  }

  /**
   * authenticates a client on the server side by matching
   * # the messages channelName against the unverseChannel's name
   * # the messages password against the universeChannel's password
   */
  public authenticate(universeMessageArg: UniverseMessage): boolean {
    return (
      this.name === universeMessageArg.targetChannelName &&
      this.passphrase === universeMessageArg.passphrase
    );
  }

  /**
   * pushes a message to clients
   * @param messageArg
   */
  public async push(messageArg: UniverseMessage) {
    this.subject.next(messageArg);
    const universeConnectionsWithChannelAccess: UniverseConnection[] = [];
    this.universeRef.universeCache.connectionMap.forEach(async socketConnection => {
      if (socketConnection.authenticatedChannels.includes(this)) {
        universeConnectionsWithChannelAccess.push(socketConnection);
      }
    });
    for (const universeConnection of universeConnectionsWithChannelAccess) {
      const smartsocket = universeConnection.socketConnection
        .smartsocketRef as plugins.smartsocket.Smartsocket;
      const universeMessageToSend: interfaces.IUniverseMessage = {
        id: messageArg.id,
        timestamp: messageArg.timestamp,
        passphrase: messageArg.passphrase,
        targetChannelName: this.name,
        messageText: messageArg.messageText,
        payload: messageArg.payload,
        payloadStringType: messageArg.payloadStringType
      };
      smartsocket.clientCall(
        'processMessage',
        universeMessageToSend,
        universeConnection.socketConnection
      );
    }
  }

  // functions to interact with a channel locally
  public async subscribe(observer: plugins.smartrx.rxjs.Observer<any>) {
    return this.subject.subscribe(observer);
  }

  /**
   * sends a message to the channel
   */
  public async sendMessage(messageDescriptor: interfaces.IMessageCreator) {
    const messageToSend = new UniverseMessage({
      id: plugins.smartunique.shortId(),
      messageText: messageDescriptor.messageText,
      payload: messageDescriptor.payload,
      payloadStringType: messageDescriptor.payloadStringType,
      targetChannelName: this.name,
      passphrase: this.passphrase,
      timestamp: Date.now()
    });
    this.push(messageToSend);
  }
}
