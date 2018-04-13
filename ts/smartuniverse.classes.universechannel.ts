import * as plugins from './smartuniverse.plugins';

/**
 * enables a set of apps to talk within their own limited borders.
 */
export class UniverseChannel {
  topic: string;
  credentials: {
    user: string;
    password: string;
  };

  /**
   * authenticates a client on the server side
   */
  async authenticateClient() {}
}
