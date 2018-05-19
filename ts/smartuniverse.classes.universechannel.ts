import * as plugins from './smartuniverse.plugins';

import { Objectmap } from 'lik';

/**
 * enables messages to stay within a certain scope.
 */
export class UniverseChannel {
  /**
   * stores the channels that are available within the universe
   */
  public static channelStore = new Objectmap();
  
  /**
   * creates new channels
   * @param channelArg the name of the topic
   * @param passphraseArg the secret thats used for a certain topic.
   */
  public static createChannel = (channelNameArg: string, passphraseArg: string) => {
    const newChannel = new UniverseChannel(channelNameArg, passphraseArg);
    return newChannel;
  }
  
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
  public async authenticateClient(passphraseArg: string): boolean {
    return passphraseArg === this.passphrase;
  }
}
