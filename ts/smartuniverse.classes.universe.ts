import * as plugins from './smartuniverse.plugins';

import { Handler, Route, Server } from '@pushrocks/smartexpress';
import { UniverseCache, UniverseChannel, UniverseMessage } from './';

import * as paths from './smartuniverse.paths';

import * as interfaces from './interfaces';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';

export interface ISmartUniverseConstructorOptions {
  messageExpiryInMilliseconds: number;
  externalServer?: plugins.smartexpress.Server;
}

/**
 * main class that setups a Universe
 */
export class Universe {
  // subinstances
  public universeCache: UniverseCache;

  // options
  private options: ISmartUniverseConstructorOptions;

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
    this.universeCache = new UniverseCache(this, this.options.messageExpiryInMilliseconds);
  }

  /**
   * stores the version of the universe server running
   * this is done since the version is exposed through the api and multiple fs actions are avoided this way.
   */
  private universeVersionStore: string;

  /**
   * get the currently running version of smartuniverse
   */
  public getUniverseVersion() {
    if (this.universeVersionStore) {
      return this.universeVersionStore;
    } else {
      const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
      this.universeVersionStore = packageJson.version;
      return this.universeVersionStore;
    }
  }

  /**
   * adds a channel to the Universe
   */
  public addChannel(nameArg: string, passphraseArg: string) {
    const newChannel = UniverseChannel.createChannel(this, nameArg, passphraseArg);
  }

  /**
   * initiates a server
   */
  public async start(portArg: number) {
    // lets create the base smartexpress server
    if (!this.options.externalServer) {
      this.smartexpressServer = new plugins.smartexpress.Server({
        cors: true,
        defaultAnswer: async () => {
          return `smartuniverse server ${this.getUniverseVersion()}`;
        },
        forceSsl: false,
        port: portArg
      });
    } else {
      this.smartexpressServer = this.options.externalServer;
    }

    // add websocket upgrade
    this.smartsocket = new plugins.smartsocket.Smartsocket({});

    // add a role for the clients
    const ClientRole = new plugins.smartsocket.SocketRole({
      name: 'UniverseClient',
      passwordHash: plugins.smarthash.sha256FromStringSync('UniverseClient') // authentication happens on another level
    });

    // add the role to smartsocket
    this.smartsocket.addSocketRoles([ClientRole]);

    const socketFunctionSubscription = new plugins.smartsocket.SocketFunction({
      allowedRoles: [ClientRole], // there is only one client role, Authentication happens on another level
      funcName: 'channelSubscription',
      funcDef: async (
        dataArg: interfaces.IServerCallSubscribeActionPayload,
        socketConnectionArg
      ) => {
        // run in "this context" of this class
        await (async () => {
          const universeConnection = new UniverseConnection({
            socketConnection: socketConnectionArg,
            authenticationRequests: [dataArg]
          });
          await UniverseConnection.addConnectionToCache(this, universeConnection);
          return {
            'subscription status': 'success'
          };
        })();
      }
    });

    const socketFunctionProcessMessage = new plugins.smartsocket.SocketFunction({
      allowedRoles: [ClientRole], // there is only one client role, Authentication happens on another level
      funcName: 'processMessage',
      funcDef: async (dataArg: interfaces.IUniverseMessage, socketConnectionArg) => {
        // run in "this" context of this class
        await (async () => {
          const universeConnection = UniverseConnection.findUniverseConnectionBySocketConnection(
            this.universeCache,
            socketConnectionArg
          );
          if (universeConnection) {
            plugins.smartlog.defaultLogger.log(
              'ok',
              'found UniverseConnection for socket for incoming message'
            );
          } else {
            plugins.smartlog.defaultLogger.log(
              'warn',
              'found no Authorized channel for incoming message'
            );
            return {
              error: 'You need to authenticate for a channel'
            };
          }
          const unauthenticatedMessage = UniverseMessage.createMessageFromPayload(
            socketConnectionArg,
            dataArg
          );
          const foundChannel = await UniverseChannel.authorizeAMessageForAChannel(
            this.universeCache,
            unauthenticatedMessage
          );
          if (foundChannel && unauthenticatedMessage.authenticated) {
            const authenticatedMessage = unauthenticatedMessage;
            await this.universeCache.addMessage(authenticatedMessage);
          }
        })();
      }
    });

    // add socket functions
    this.smartsocket.addSocketFunction(socketFunctionSubscription);
    this.smartsocket.addSocketFunction(socketFunctionProcessMessage);

    // add smartsocket to the running smartexpress app
    this.smartsocket.setExternalServer('smartexpress', this.smartexpressServer as any);
    // start everything
    if (!this.options.externalServer) {
      await this.smartexpressServer.start();
    }
    await this.smartsocket.start();
    plugins.smartlog.defaultLogger.log('success', 'started universe');
  }

  /**
   * stop everything
   */
  public async stopServer() {
    await this.smartsocket.stop();
    if (!this.options.externalServer) {
      await this.smartexpressServer.stop();
    }
  }
}
