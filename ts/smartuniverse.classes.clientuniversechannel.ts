import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';

import { ClientUniverse } from './';

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
  public static async createClientUniverseChannel(
    clientUniverseArg: ClientUniverse,
    channelNameArg: string,
    passphraseArg: string
  ): Promise<ClientUniverseChannel> {
    const clientChannel = new ClientUniverseChannel(
      clientUniverseArg,
      channelNameArg,
      passphraseArg
    );
    clientUniverseArg.channelCache.add(clientChannel);
    await clientChannel.subscribe();
    return clientChannel;
  }

  // ========
  // INSTANCE
  // ========

  // properties
  public name: string;
  public passphrase: string;

  // refs
  public clientUniverse: ClientUniverse;

  constructor(clientUniverseArg: ClientUniverse, nameArg: string, passphraseArg: string) {
    this.clientUniverse = clientUniverseArg;
    this.name = nameArg;
    this.passphrase = passphraseArg;
  }

  /**
   * subscribes to a channel
   * tells the universe about this instances interest into a channel
   */
  public async subscribe() {
    this.clientUniverse.socketClient;
  }
}
