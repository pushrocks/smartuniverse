import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
export declare class ClientUniverseMessage<T> implements interfaces.IUniverseMessage {
    static createMessageFromMessageDescriptor(messageDescriptor: interfaces.IUniverseMessage): ClientUniverseMessage<unknown>;
    id: string;
    timestamp: number;
    smartTimestamp: plugins.smarttime.TimeStamp;
    messageText: string;
    passphrase: string;
    payload: T;
    targetChannelName: string;
    constructor(messageArg: interfaces.IUniverseMessage);
    /**
     * gets json for payload
     */
    getAsJsonForPayload(): void;
}
