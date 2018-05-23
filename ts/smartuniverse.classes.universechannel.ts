import * as plugins from './smartuniverse.plugins';

import { Objectmap } from 'lik';

/**
 * enables messages to stay within a certain scope.
 */
export class UniverseChannel {
  /**
   * stores the channels that are available within the universe
   */
  public static channelStore = new Objectmap<UniverseChannel>();

  /**
   * allows messages to be processed in a blacklist mode for further analysis
   */
  public static blackListChannel = new UniverseChannel('blacklist', 'nada');

  /**
   * creates new channels
   * @param channelArg the name of the topic
   * @param passphraseArg the secret thats used for a certain topic.
   */
  public static createChannel (channelNameArg: string, passphraseArg: string) {
    const newChannel = new UniverseChannel(channelNameArg, passphraseArg);
    return newChannel;
  };

  public static authorizeForChannel (channelNameArg: string, passphraseArg: string) {
    const foundChannel = this.channelStore.find(universeChannel => {
       const result = universeChannel.authenticate(channelNameArg, passphraseArg);
       return result;
    });
    if(foundChannel) {
      return foundChannel;
    } else {
      return this.blackListChannel;
    }
  };

  /**
   * the name of the channel
   */
  public name: string;

  /**
   * the passphrase for the channel
   */
  public passphrase: string;

  constructor(channelNameArg: string, passphraseArg: string) {
    this.name = channelNameArg;
    this.passphrase = passphraseArg;
    UniverseChannel.channelStore.add(this);
  }

  /**
   * authenticates a client on the server side
   */
  public authenticate(channelNameArg: string, passphraseArg: string): boolean {
    return (this.name === channelNameArg &&  this.passphrase === passphraseArg);
  }
}
