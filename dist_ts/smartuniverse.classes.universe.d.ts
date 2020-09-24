import * as plugins from './smartuniverse.plugins';
import { UniverseCache, UniverseChannel } from './';
export interface ISmartUniverseConstructorOptions {
    messageExpiryInMilliseconds: number;
    externalServer?: plugins.smartexpress.Server;
}
/**
 * main class that setups a Universe
 */
export declare class Universe {
    universeCache: UniverseCache;
    private options;
    /**
     * the smartexpress server used
     */
    private smartexpressServer;
    /**
     * the smartsocket used
     */
    private smartsocket;
    constructor(optionsArg: ISmartUniverseConstructorOptions);
    /**
     * stores the version of the universe server running
     * this is done since the version is exposed through the api and multiple fs actions are avoided this way.
     */
    private universeVersionStore;
    /**
     * get the currently running version of smartuniverse
     */
    getUniverseVersion(): string;
    /**
     * adds a channel to the Universe
     */
    addChannel(nameArg: string, passphraseArg: string): UniverseChannel;
    /**
     * returns a channel
     */
    getChannel(channelNameArg: string): UniverseChannel;
    /**
     * initiates a server
     */
    start(portArg: number): Promise<void>;
    /**
     * stop everything
     */
    stopServer(): Promise<void>;
}
