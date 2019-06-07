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
    universeConnection = this.authenticateAuthenticationRequests();
  }

  /**
   * deduplicates UniverseConnections
   */
  public deduplicateUniverseConnection (universeConnectionArg: UniverseConnection): Promise<UniverseConnection> {

  }

  /**
   * authenticate AuthenticationRequests
   */
  public authenticateAuthenticationRequests(universeConnectionArg) {

  }
}
