import * as plugins from './smartuniverse.plugins';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';

/**
 * manages connections to a universe
 */
export class UniverseConnectionManager {
  public connectionMap = new plugins.lik.Objectmap<UniverseConnection>();

  public async addConnection(universeConnectionArg: UniverseConnection) {
    let universeConnection = universeConnectionArg;
    universeConnection = await this.deduplicateUniverseConnection(universeConnection);
    universeConnection = await this.authenticateAuthenticationRequests(universeConnection);
  }

  /**
   * deduplicates UniverseConnections
   */
  public async deduplicateUniverseConnection (universeConnectionArg: UniverseConnection): Promise<UniverseConnection> {
    let connectionToReturn: UniverseConnection;
    this.connectionMap.forEach(async existingConnection => {
      if (existingConnection.socketConnection = universeConnectionArg.socketConnection) {
        connectionToReturn = await this.mergeUniverseConnections(existingConnection, universeConnectionArg);
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
  public authenticateAuthenticationRequests(universeConnectionArg): Promise<UniverseConnection> {
    // TODO: authenticate connections
    return universeConnectionArg;
  }

  /**
   * merges two UniverseConnections
   */
  public mergeUniverseConnections (connectionArg1: UniverseConnection, connectionArg2: UniverseConnection) {
    // TODO: merge connections
    return connectionArg1;
  }
}
