import * as plugins from './smartuniverse.plugins';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { Observable } from 'rxjs';
export declare class UniverseStore {
    standardMessageExpiry: number;
    destructionTime: number;
    messageStore: plugins.lik.Objectmap<UniverseMessage>;
    private lastId;
    constructor(standardMessageExpiryArg: number);
    /**
     * add a message to the UniverseStore
     * @param messageArg
     * @param attachedPayloadArg
     */
    addMessage(messageArg: any, attachedPayloadArg: any): void;
    /**
     * Read a message from the UniverseStore
     */
    readMessagesYoungerThan(unixTimeArg?: number): Observable<UniverseMessage>;
}
