import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { Timer, TimeStamp } from '@pushrocks/smarttime';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';
import { SocketConnection } from '@pushrocks/smartsocket';
/**
 * represents a message within a universe
 * acts as a container to save message states like authentication status
 */
export declare class UniverseMessage<T> implements interfaces.IUniverseMessage {
    static createMessageFromPayload(socketConnectionArg: SocketConnection, dataArg: interfaces.IUniverseMessage): UniverseMessage<unknown>;
    id: string;
    timestamp: number;
    smartTimestamp: TimeStamp;
    messageText: string;
    passphrase: string;
    payload: T;
    targetChannelName: string;
    socketConnection: SocketConnection;
    /**
     * the UniverseCache the message is attached to
     */
    universeCache: UniverseCache;
    /**
     * enables unprotected grouping of messages for efficiency purposes.
     */
    universeChannelList: plugins.lik.ObjectMap<UniverseChannel>;
    /**
     * wether the message is authenticated
     */
    authenticated: boolean;
    /**
     * a destruction timer for this message
     */
    destructionTimer: Timer;
    /**
     * the constructor to create a universe message
     * @param messageArg
     * @param attachedPayloadArg
     */
    constructor(messageDescriptor: interfaces.IUniverseMessage);
    setUniverseCache(universeCacheArg: UniverseCache): void;
    setTargetChannel(): void;
    setDestructionTimer(selfdestructAfterArg?: number): void;
    /**
     * handles bad messages for further analysis
     */
    handleAsBadMessage(): void;
}
