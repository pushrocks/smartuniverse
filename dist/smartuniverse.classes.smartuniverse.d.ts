export interface ISmartUniverseConstructorOptions {
    port: number | string;
}
export declare class SmartUniverse {
    private options;
    private universeVersionStore;
    private readonly universeVersion;
    private smartexpressServer;
    constructor(optionsArg: ISmartUniverseConstructorOptions);
    init(): Promise<void>;
}
