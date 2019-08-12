import * as plugins from './smartuniverse.plugins';

import { UniverseCache } from './smartuniverse.classes.universecache';
import { UniverseMessage } from './smartuniverse.classes.universemessage';

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
    universeCacheArg: UniverseCache,
    channelNameArg: string,
    passphraseArg: string
  ) {
    const newChannel = new UniverseChannel(universeCacheArg, channelNameArg, passphraseArg);
    universeCacheArg.channelMap.add(newChannel);
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
  ) {
    const foundChannel = universeCacheArg.channelMap.find(universeChannel => {
      const result = universeChannel.authenticate(universeMessageArg);
      return result;
    });
    if (foundChannel) {
      universeMessageArg.authenticated = true;
      universeMessageArg.universeChannelList.add(foundChannel);
      return foundChannel;
    } else {
      universeMessageArg.authenticated = false;
      universeMessageArg.universeChannelList.add(universeCacheArg.blackListChannel);
      console.log('message not valid');
    }
  }

  // ========
  // INSTANCE
  // ========
  /**
   * the name of the channel
   */
  public name: string;
  public universeCacheInstance: UniverseCache;

  /**
   * the passphrase for the channel
   */
  public passphrase: string;

  constructor(universeCacheArg: UniverseCache, channelNameArg: string, passphraseArg: string) {
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

  public pushToClients(messageArg: UniverseMessage) {}
}
