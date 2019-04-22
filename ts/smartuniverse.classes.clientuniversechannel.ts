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
  
  constructor(clientUniverseArg: ClientUniverse, nameArg: string,  passphraseArg: string) {
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
