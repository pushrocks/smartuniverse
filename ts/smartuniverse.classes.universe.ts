import * as plugins from './smartuniverse.plugins';
import * as pluginsTyped from './smartuniverse.pluginstyped';

import { Handler, Route, Server } from '@pushrocks/smartexpress';
import { UniverseCache, UniverseChannel, UniverseMessage } from './';

import * as interfaces from './interfaces';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';
import { logger } from './smartuniverse.logging';

export interface ISmartUniverseConstructorOptions {
  messageExpiryInMilliseconds: number;
  externalServer?: pluginsTyped.smartexpress.Server;
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
  private smartexpressServer: pluginsTyped.smartexpress.Server;

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
  /* public getUniverseVersion() {
    if (this.universeVersionStore) {
      return this.universeVersionStore;
    } else {
      const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
      this.universeVersionStore = packageJson.version;
      return this.universeVersionStore;
    }
  } */

  /**
   * adds a channel to the Universe
   */
  public addChannel(nameArg: string, passphraseArg: string) {
    const newChannel = UniverseChannel.createChannel(this, nameArg, passphraseArg);
    return newChannel;
  }

  /**
   * returns a channel
   */
  public getChannel(channelNameArg: string) {
    return this.universeCache.channelMap.find((channelArg) => {
      return channelArg.name === channelNameArg;
    });
  }

  /**
   * initiates a server
   */
  public async start(portArg?: number) {
    if (!this.options.externalServer && !portArg) {
      throw new Error(`You supplied an external error. You need to specify a portArg to start on.`);
    }

    portArg = portArg || 3000; // TODO: remove

    // add websocket upgrade
    this.smartsocket = new plugins.smartsocket.Smartsocket({
      port: portArg
    });

    // lets create the base smartexpress server
    if (this.options.externalServer) {
      console.log('Universe is using externally supplied server');
      this.smartsocket.setExternalServer('smartexpress' ,this.options.externalServer);
    }

    // add a role for the clients
    const ClientRole = new plugins.smartsocket.SocketRole({
      name: 'UniverseClient',
      passwordHash: await plugins.isohash.sha256FromString('UniverseClient'), // authentication happens on another level
    });

    // add the role to smartsocket
    this.smartsocket.addSocketRoles([ClientRole]);

    const socketFunctionSubscription = new plugins.smartsocket.SocketFunction<
      interfaces.ISocketRequest_SubscribeChannel
    >({
      allowedRoles: [ClientRole], // there is only one client role, Authentication happens on another level
      funcName: 'subscribeChannel',
      funcDef: async (dataArg, socketConnectionArg) => {
        const universeConnection = new UniverseConnection({
          universe: this,
          socketConnection: socketConnectionArg,
          authenticationRequests: [dataArg],
        });
        await UniverseConnection.addConnectionToCache(this, universeConnection);
        return {
          subscriptionStatus: 'subscribed',
        };
      },
    });

    const socketFunctionProcessMessage = new plugins.smartsocket.SocketFunction<any>({ // TODO proper ITypedRequest here instead of any
      allowedRoles: [ClientRole], // there is only one client role, Authentication happens on another level
      funcName: 'processMessage',
      funcDef: async (messageDataArg: interfaces.IUniverseMessage, socketConnectionArg) => {
        const universeConnection = UniverseConnection.findUniverseConnectionBySocketConnection(
          this.universeCache,
          socketConnectionArg
        );
        if (universeConnection) {
          logger.log('ok', 'found UniverseConnection for socket for incoming message');
        } else {
          logger.log('warn', 'found no Authorized channel for incoming message');
          return {
            error: 'You need to authenticate for a channel',
          };
        }
        const unauthenticatedMessage = UniverseMessage.createMessageFromPayload(
          socketConnectionArg,
          messageDataArg
        );
        const foundChannel = await UniverseChannel.authorizeAMessageForAChannel(
          this.universeCache,
          unauthenticatedMessage
        );
        if (foundChannel && unauthenticatedMessage.authenticated) {
          const authenticatedMessage = unauthenticatedMessage;
          await this.universeCache.addMessage(authenticatedMessage);
        }
      },
    });

    // add socket functions
    this.smartsocket.addSocketFunction(socketFunctionSubscription);
    this.smartsocket.addSocketFunction(socketFunctionProcessMessage);

    // add smartsocket to the running smartexpress app
    await this.smartsocket.start();
    logger.log('success', 'started universe');
  }

  /**
   * stop everything
   */
  public async stopServer() {
    await this.smartsocket.stop();
  }
}
