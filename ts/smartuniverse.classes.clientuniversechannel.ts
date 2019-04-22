import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { ClientUniverse } from './';

export class ClientUniverseChannel implements interfaces.IUniverseChannel {
  // ======
  // STATIC
  // ======
  public static async createClientUniverseChannel(
    clientUniverseArg: ClientUniverse,
    channelName: string,
    passphraseArg: string
  ): Promise<ClientUniverseChannel> {
    const clientChannel = new ClientUniverseChannel(clientUniverseArg, passphraseArg);
    await clientChannel.transmitSubscription();
    return clientChannel;
  }

  // ========
  // INSTANCE
  // ========

  public clientUniverse: ClientUniverse;
  public passphrase: string;

  constructor(clientUniverseArg: ClientUniverse, passphraseArg: string) {
    this.clientUniverse = clientUniverseArg;
    this.passphrase = passphraseArg
  }

  /**
   * tells the universe about this instances interest into a channel
   */
  public async transmitSubscription() {
    this.clientUniverse.socketClient;
  }
}
