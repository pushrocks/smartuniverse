import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';

/**
 * represents a connection to the universe
 */
export class UniverseConnection {
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
  public terminateConnection () {
    this.socketConnection.socket.disconnect();
    this.terminatedDeferred.resolve();
  }

  constructor(optionsArg: {
    socketConnection: plugins.smartsocket.SocketConnection;
    authenticationRequests
  }) {
    this.socketConnection,
  }
}
