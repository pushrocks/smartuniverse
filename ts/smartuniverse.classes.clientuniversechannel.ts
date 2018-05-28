import * as plugins from './smartuniverse.plugins';

import { ClientUniverse, IUniverseChannel } from './';

export class ClientUniverseChannel implements IUniverseChannel {
  // ======
  // STATIC
  // ======
  public static async createClientUniverseChannel(
    clientUniverseArg: ClientUniverse,
    channelName: string
  ): Promise<ClientUniverseChannel> {
    const clientChannel = new ClientUniverseChannel(clientUniverseArg);
    await clientChannel.transmitSubscription();
    return clientChannel;
  }

  // ========
  // INSTANCE
  // ========

  public clientUniverse: ClientUniverse;

  constructor(clientUniverseArg: ClientUniverse) {
    this.clientUniverse = clientUniverseArg;
  }

  /**
   * tells the universe about this instances interest into a channel
   */
  public async transmitSubscription() {
    this.clientUniverse.socketClient;
  }
}
