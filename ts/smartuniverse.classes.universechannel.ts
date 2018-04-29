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
   * @param secretArg the secret thats used for a certain topic.
   */
  public static createChannel = (channelArg: string, secretArg: string) => {

  }

  credentials: {
    user: string;
    password: string;
  };

  /**
   * authenticates a client on the server side
   */
  async authenticateClient() {}
}
