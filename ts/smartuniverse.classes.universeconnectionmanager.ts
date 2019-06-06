import * as plugins from './smartuniverse.plugins';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';

/**
 * manages connections to a universe
 */
export class UniverseConnectionManager {
  public connectionMap = new plugins.lik.Objectmap<UniverseConnection>();

  public addConnection() {}
}
