import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { Observable } from 'rxjs';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';
import { Universe } from './smartuniverse.classes.universe';
/**
 * universe store handles the creation, storage and retrieval of messages.
 */
export declare class UniverseCache {
    standardMessageExpiry: number;
    destructionTime: number;
    /**
     * stores messages for this instance
     */
    messageMap: plugins.lik.ObjectMap<UniverseMessage<any>>;
    /**
     * stores the channels that are available within the universe
     */
    channelMap: plugins.lik.ObjectMap<UniverseChannel>;
    /**
     * stores all connections
     */
    connectionMap: plugins.lik.ObjectMap<UniverseConnection>;
    /**
     * allows messages to be processed in a blacklist mode for further analysis
     */
    blackListChannel: UniverseChannel;
    universeRef: Universe;
    constructor(universeArg: Universe, standardMessageExpiryArg: number);
    /**
     * add a message to the UniverseCache
     * @param messageArg
     * @param attachedPayloadArg
     */
    addMessage(messageArg: UniverseMessage<any>): Promise<void>;
    /**
     * Read a message from the UniverseCache
     */
    readMessagesYoungerThan(unixTimeArg?: number, channelName?: string): Observable<UniverseMessage<any>>;
}
