import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';

/**
 * represents a connection to the universe
 */
export class UniverseConnection {
  /**
   * the socketClient to ping
   */
  public socketConnection: plugins.smartsocket.SocketConnection;
  public authenticationRequests = []
  public subscribedChannels: UniverseChannel[] = [];
  public authenticatedChannels: UniverseChannel[] = [];
  public failedToJoinChannels: UniverseChannel[] = [];

  public terminateConnection () {
    this.socketConnection
  }

  constructor(optionsArg: {
    socketConnection: plugins.smartsocket.SocketConnection;
  }) {
    this.socketConnection,
  }
}
