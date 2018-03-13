import { Timer, TimeStamp } from 'smarttime';
import { UniverseStore } from './smartuniverse.classes.universestore';
export declare class UniverseMessage {
    /**
     * public and unique id
     * numeric ascending
     * adheres to time in milliseconds
     * avoids duplications though
     */
    id: number;
    universeStore: UniverseStore;
    timestamp: TimeStamp;
    message: string;
    attachedPayload: any;
    destructionTimer: Timer;
    constructor(parentUniverseStore: UniverseStore, messageArg: string, attachedPayloadArg: any, selfdestructAfterArg: number);
}
