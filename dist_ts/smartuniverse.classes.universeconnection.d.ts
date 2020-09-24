import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';
import { Universe } from './smartuniverse.classes.universe';
/**
 * represents a connection to the universe
 */
export declare class UniverseConnection {
    /**
     *
     * @param universeConnectionArg
     */
    static addConnectionToCache(universeRef: Universe, universeConnectionArg: UniverseConnection): Promise<void>;
    /**
     * deduplicates UniverseConnections
     */
    static deduplicateUniverseConnection(universeCache: UniverseCache, universeConnectionArg: UniverseConnection): Promise<UniverseConnection>;
    /**
     * authenticate AuthenticationRequests
     */
    static authenticateAuthenticationRequests(universeRef: Universe, universeConnectionArg: UniverseConnection): Promise<UniverseConnection>;
    /**
     * merges two UniverseConnections
     */
    static mergeUniverseConnections(connectionArg1: UniverseConnection, connectionArg2: UniverseConnection): UniverseConnection;
    /**
     * finds a UniverseConnection by providing a socket connection
     */
    static findUniverseConnectionBySocketConnection(universeCache: UniverseCache, socketConnectionArg: plugins.smartsocket.SocketConnection): UniverseConnection;
    universeRef: Universe;
    terminatedDeferred: plugins.smartpromise.Deferred<unknown>;
    /**
     * the socketClient to ping
     */
    socketConnection: plugins.smartsocket.SocketConnection;
    authenticationRequests: Array<interfaces.ISocketRequest_SubscribeChannel['request']>;
    authenticatedChannels: UniverseChannel[];
    failedToJoinChannels: UniverseChannel[];
    /**
     * disconnect the connection
     */
    disconnect(reason?: 'upstreamevent' | 'triggered'): Promise<void>;
    constructor(optionsArg: {
        universe: Universe;
        socketConnection: plugins.smartsocket.SocketConnection;
        authenticationRequests: Array<interfaces.ISocketRequest_SubscribeChannel['request']>;
    });
}
