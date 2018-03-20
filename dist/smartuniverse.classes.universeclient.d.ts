import * as plugins from './smartuniverse.plugins';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
export interface IClientOptions {
    serverAddress: string;
}
export declare class UniverseClient {
    options: any;
    private socketClient;
    private observableIntake;
    constructor(optionsArg: IClientOptions);
    sendMessage(messageArg: any, payloadArg: any): Promise<void>;
    getMessageObservable(): plugins.smartrx.rxjs.Observable<UniverseMessage>;
}
