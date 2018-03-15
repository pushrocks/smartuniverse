export interface IClientOptions {
    serverAddress: string;
}
export declare class UniverseClient {
    options: any;
    constructor(optionsArg: IClientOptions);
    sendMessage(messageArg: any, payloadArg: any): Promise<void>;
    getMessageObservable(): void;
}
