export interface IClientOptions {
    serverAddress: string;
}
export declare class UniverseClient {
    options: any;
    constructor(optionsArg: IClientOptions);
    sendMessage(message: any, messagePayload: any): void;
    getMessageObservable(): void;
}
