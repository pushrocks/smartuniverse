import * as plugins from './smartuniverse.plugins';
import { ClientUniverseChannel } from './smartuniverse.classes.client.universechannel';

/**
 * a cache for clients
 * keeps track of which messages have already been received
 * good for deduplication in mesh environments
 */
export class ClientUniverseCache {
  public channelMap = new plugins.lik.ObjectMap<ClientUniverseChannel>();
}
