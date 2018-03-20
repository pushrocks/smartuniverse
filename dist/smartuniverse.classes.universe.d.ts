import { UniverseManager } from './smartuniverse.classes.manager';
import { UniverseStore } from './smartuniverse.classes.universestore';
export interface ISmartUniverseConstructorOptions {
    messageExpiryInMilliseconds: number;
}
export interface IServerGetMessagesRequestBody {
    youngerThan: number;
}
export interface IServerPutMessageRequestBody {
    message: string;
    payload: any;
}
export declare class Universe {
    universeStore: UniverseStore;
    universeManager: UniverseManager;
    private options;
    private universeVersionStore;
    private readonly universeVersion;
    private smartexpressServer;
    private smartsocket;
    constructor(optionsArg: ISmartUniverseConstructorOptions);
    /**
     * initiates a server
     */
    initServer(portArg: number | string): Promise<void>;
    stopServer(): Promise<void>;
}
