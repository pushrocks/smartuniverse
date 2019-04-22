import * as plugins from './smartuniverse.plugins';

import { Handler, Route, Server } from '@pushrocks/smartexpress';
import { UniverseCache, UniverseChannel, UniverseMessage } from './';

import * as paths from './smartuniverse.paths';

import * as interfaces from './interfaces';

export interface ISmartUniverseConstructorOptions {
  messageExpiryInMilliseconds: number;
}



/**
 * main class that setsup a Universe
 */
export class Universe {
  // subinstances
  public universeCache: UniverseCache;

  // options
  private options: ISmartUniverseConstructorOptions;

  /**
   * stores the version of the universe server running
   * this is done since the version is exposed through the api and multiple fs actions are avoided this way.
   */
  private universeVersionStore: string;

  /**
   * get the currently running version of smartuniverse
   */
  public get universeVersion() {
    if (this.universeVersionStore) {
      return this.universeVersionStore;
    } else {
      const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
      this.universeVersionStore = packageJson.version;
      return this.universeVersionStore;
    }
  }

  /**
   * the smartexpress server used
   */
  private smartexpressServer: plugins.smartexpress.Server;

  /**
   * the smartsocket used
   */
  private smartsocket: plugins.smartsocket.Smartsocket;

  constructor(optionsArg: ISmartUniverseConstructorOptions) {
    this.options = optionsArg;
    this.universeCache = new UniverseCache(this.options.messageExpiryInMilliseconds);
  }

  /**
   * adds a channel to the Universe
   */
  public async addChannel(nameArg: string, passphraseArg: string) {
    const newChannel = UniverseChannel.createChannel(this.universeCache, nameArg, passphraseArg);
  }

  /**
   * initiates a server
   */
  public async start(portArg: number | string) {
    // lets create the base smartexpress server
    this.smartexpressServer = new plugins.smartexpress.Server({
      cors: true,
      defaultAnswer: async () => {
        return `smartuniverse server ${this.universeVersion}`;
      },
      forceSsl: false,
      port: portArg
    });

    // lets create the http request route
    this.smartexpressServer.addRoute('/sendmessage', new Handler('POST', async (req, res) => {
      const universeMessageInstance = new UniverseMessage(req.body);
      this.universeCache.addMessage(universeMessageInstance);
    }));

    // add websocket upgrade
    this.smartsocket = new plugins.smartsocket.Smartsocket({
      port: 12345 // fix this within smartsocket
    });

    // add a role for the clients
    const ClientRole = new plugins.smartsocket.SocketRole({
      name: 'clientuniverse',
      passwordHash: 'clientuniverse' // authentication happens on another level
    });

    // add the role to smartsocket
    this.smartsocket.addSocketRoles([ClientRole]);

    const SubscriptionSocketFunction = new plugins.smartsocket.SocketFunction({
      allowedRoles: [ClientRole],
      funcName: 'channelSubscription',
      funcDef: () => {
        console.log('a client connected');
      } // TODO: implement an action upon connection of clients
    });

    // add smartsocket to the running smartexpress app
    this.smartsocket.setExternalServer('express', this.smartexpressServer as any);

    // start the socket
    this.smartsocket.start();

    // start the smartexpress instance
    await this.smartexpressServer.start();
  }

  /**
   * stop everything
   */
  public async stopServer() {
    await this.smartsocket.stop();
    await this.smartexpressServer.stop();
  }
}
