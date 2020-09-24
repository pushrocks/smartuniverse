import * as plugins from './smartuniverse.plugins';
import { ClientUniverseChannel, ClientUniverseMessage } from './';
import { ClientUniverseCache } from './smartuniverse.classes.clientuniversecache';
export interface IClientOptions {
    serverAddress: string;
    autoReconnect: boolean;
}
/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
export declare class ClientUniverse {
    options: IClientOptions;
    smartsocketClient: plugins.smartsocket.SmartsocketClient;
    messageRxjsSubject: plugins.smartrx.rxjs.Subject<ClientUniverseMessage<any>>;
    clientUniverseCache: ClientUniverseCache;
    autoReconnectStatus: 'on' | 'off';
    constructor(optionsArg: IClientOptions);
    /**
     * adds a channel to the channelcache
     * TODO: verify channel before adding it to the channel cache
     */
    addChannel(channelNameArg: string, passphraseArg: string): ClientUniverseChannel;
    /**
     * gets a channel from the channelcache
     * @param channelName
     * @param passphraseArg
     */
    getChannel(channelName: string): ClientUniverseChannel;
    /**
     * remove a a achannel
     * @param messageArg
     */
    removeChannel(channelNameArg: any, notifyServer?: boolean): void;
    start(): Promise<void>;
    stop(): Promise<void>;
    /**
     * checks the connection towards a universe server
     * since password validation is done through other means, a connection should always be possible
     */
    private checkConnection;
    private disconnect;
}
