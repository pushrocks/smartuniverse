import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';
import { Universe } from './smartuniverse.classes.universe';

/**
 * represents a connection to the universe
 */
export class UniverseConnection {
  /**
   *
   * @param universeConnectionArg
   */
  public static async addConnectionToCache(
    universeRef: Universe,
    universeConnectionArg: UniverseConnection
  ) {
    let universeConnection = universeConnectionArg;
    universeConnection = await UniverseConnection.deduplicateUniverseConnection(
      universeRef.universeCache,
      universeConnection
    );
    universeConnection = await UniverseConnection.authenticateAuthenticationRequests(
      universeRef,
      universeConnection
    );
    universeRef.universeCache.connectionMap.add(universeConnection);
  }

  /**
   * deduplicates UniverseConnections
   */
  public static async deduplicateUniverseConnection(
    universeCache: UniverseCache,
    universeConnectionArg: UniverseConnection
  ): Promise<UniverseConnection> {
    let connectionToReturn: UniverseConnection;
    universeCache.connectionMap.forEach(async existingConnection => {
      if (existingConnection.socketConnection === universeConnectionArg.socketConnection) {
        connectionToReturn = await this.mergeUniverseConnections(
          existingConnection,
          universeConnectionArg
        );
      }
    });
    if (!connectionToReturn) {
      connectionToReturn = universeConnectionArg;
    }
    return connectionToReturn;
  }

  /**
   * authenticate AuthenticationRequests
   */
  public static async authenticateAuthenticationRequests(
    universeRef: Universe,
    universeConnectionArg: UniverseConnection
  ): Promise<UniverseConnection> {
    for (const authenticationRequest of universeConnectionArg.authenticationRequests) {
      const universeChannelToAuthenticateAgainst = UniverseChannel.getUniverseChannelByName(
        universeRef,
        authenticationRequest.name
      );
      if (universeChannelToAuthenticateAgainst.passphrase === authenticationRequest.passphrase) {
        universeConnectionArg.authenticatedChannels.push(universeChannelToAuthenticateAgainst);
      }
    }
    return universeConnectionArg;
  }

  /**
   * merges two UniverseConnections
   */
  public static mergeUniverseConnections(
    connectionArg1: UniverseConnection,
    connectionArg2: UniverseConnection
  ) {
    return connectionArg1;
  }

  /**
   * finds a UniverseConnection by providing a socket connection
   */
  public static findUniverseConnectionBySocketConnection(
    universeCache: UniverseCache,
    socketConnectionArg: plugins.smartsocket.SocketConnection
  ): UniverseConnection {
    const universeConnection = universeCache.connectionMap.find(universeConnectionArg => {
      return universeConnectionArg.socketConnection === socketConnectionArg;
    });
    return universeConnection;
  }

  public terminatedDeferred = plugins.smartpromise.defer();

  /**
   * the socketClient to ping
   */
  public socketConnection: plugins.smartsocket.SocketConnection;
  public authenticationRequests: Array<interfaces.ISocketRequest_SubscribeChannel['request']> = [];
  public subscribedChannels: UniverseChannel[] = [];
  public authenticatedChannels: UniverseChannel[] = [];
  public failedToJoinChannels: UniverseChannel[] = [];

  /**
   * terminates the connection
   */
  public terminateConnection() {
    this.socketConnection.socket.disconnect();
    this.terminatedDeferred.resolve();
  }

  constructor(optionsArg: {
    socketConnection: plugins.smartsocket.SocketConnection;
    authenticationRequests: Array<interfaces.ISocketRequest_SubscribeChannel['request']>;
  }) {
    this.authenticationRequests = optionsArg.authenticationRequests;
    this.socketConnection = optionsArg.socketConnection;
  }
}
