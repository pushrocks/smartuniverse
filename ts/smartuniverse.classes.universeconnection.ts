import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';

/**
 * represents a connection to the universe
 */
export class UniverseConnection {
  /**
   *
   * @param universeConnectionArg
   */
  public static async addConnectionToCache(
    universeCache: UniverseCache,
    universeConnectionArg: UniverseConnection
  ) {
    let universeConnection = universeConnectionArg;
    universeConnection = await UniverseConnection.deduplicateUniverseConnection(
      universeCache,
      universeConnection
    );
    universeConnection = await UniverseConnection.authenticateAuthenticationRequests(
      universeConnection
    );
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
  public static authenticateAuthenticationRequests(
    universeConnectionArg
  ): Promise<UniverseConnection> {
    // TODO: authenticate connections
    return universeConnectionArg;
  }

  /**
   * merges two UniverseConnections
   */
  public static mergeUniverseConnections(
    connectionArg1: UniverseConnection,
    connectionArg2: UniverseConnection
  ) {
    // TODO: merge connections
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
  public authenticationRequests = [];
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
    authenticationRequests: interfaces.IServerCallSubscribeActionPayload[];
  }) {
    // TODO: check if this is correct
    this.socketConnection = optionsArg.socketConnection;
  }
}
