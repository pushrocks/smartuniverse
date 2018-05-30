import * as plugins from './smartuniverse.plugins';

import { Handler, Route, Server } from 'smartexpress';
import { UniverseCache, UniverseChannel, UniverseMessage } from './';

import * as paths from './smartuniverse.paths';

export interface ISmartUniverseConstructorOptions {
  messageExpiryInMilliseconds: number;
}

export interface IServerGetMessagesRequestBody {
  channel: string;
  topic?: string;
  youngerThan: number;
}

/**
 * the interface for a standard request
 */
export interface IServerPutMessageRequestBody {
  channel: string;
  passphrase: string;
  message: string;
  payload: any;
}

/**
 * main class that setsup a Universe
 */
export class Universe {
  // subinstances
  public universeCache: UniverseCache;

  // options
  private options: ISmartUniverseConstructorOptions;

  // Store version handling
  private universeVersionStore: string;
  private get universeVersion() {
    if (this.universeVersionStore) {
      return this.universeVersionStore;
    } else {
      const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
      this.universeVersionStore = packageJson.version;
      return this.universeVersionStore;
    }
  }

  private smartexpressServer: plugins.smartexpress.Server;
  private smartsocket: plugins.smartsocket.Smartsocket;

  constructor(optionsArg: ISmartUniverseConstructorOptions) {
    this.options = optionsArg;
    this.universeCache = new UniverseCache(this.options.messageExpiryInMilliseconds);
  }

  /**
   * adds a channel to the Universe
   */
  public async addChannel(nameArg: string, passphraseArg: string) {
    const newChannel = new UniverseChannel(this.universeCache, nameArg, passphraseArg);
    this.universeCache.channelMap.add(newChannel);
  }

  /**
   * initiates a server
   */
  public async initServer(portArg: number | string) {
    this.smartexpressServer = new plugins.smartexpress.Server({
      cors: true,
      defaultAnswer: `smartuniverse server ${this.universeVersion}`,
      forceSsl: false,
      port: portArg
    });

    // add websocket upgrade
    this.smartsocket = new plugins.smartsocket.Smartsocket({
      port: 12345 // fix this within smartsocket
    });

    const ClientRole = new plugins.smartsocket.SocketRole({
      name: 'clientuniverse',
      passwordHash: 'clientuniverse' // authentication happens on another level
    });

    this.smartsocket.addSocketRoles([ClientRole]);

    const SubscriptionSocketFunction = new plugins.smartsocket.SocketFunction({
      allowedRoles: [ClientRole],
      funcName: 'channelSubscription',
      funcDef: () => {}
    });

    this.smartsocket.setExternalServer('express', this.smartexpressServer as any);
    // should work with express as well
    this.smartsocket.start();

    await this.smartexpressServer.start();
  }

  public async stopServer() {
    await this.smartsocket.stop();
    await this.smartexpressServer.stop();
  }
}
