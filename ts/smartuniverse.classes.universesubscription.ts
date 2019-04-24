import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';



/**
 * represents a subscription into a specific topic
 */
export class UniverseConnection {
  /**
   * the socketClient to ping
   */
  socketclient: plugins.smartsocket.SmartsocketClient;
  subscribedChannels: UniverseChannel[] = [];
  authenticatedChannels: UniverseChannel[] = [];

  constructor() {

  }
}