import * as plugins from './smartuniverse.plugins';

import { Objectmap } from 'lik';
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
    return newChannel;
  }

  /**
   * returns boolean wether certain channel exists
   */
  public static async doesChannelExists(universeCacheArg: UniverseCache, channelNameArg: string) {
    const channel = universeCacheArg.channelCache.find(channelArg => {
      return channelArg.name === channelNameArg;
    });
    if (channel) {
      return true;
    } else {
      return false;
    }
  }

  public static authorizeAMessageForAChannel(
    universeCacheArg: UniverseCache,
    universeMessageArg: UniverseMessage
  ) {
    const foundChannel = universeCacheArg.channelCache.find(universeChannel => {
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
   * authenticates a client on the server side
   */
  public authenticate(universeMessageArg: UniverseMessage): boolean {
    return (
      this.name === universeMessageArg.requestedChannelName &&
      this.passphrase === universeMessageArg.requestedChannelPassphrase
    );
  }
}
