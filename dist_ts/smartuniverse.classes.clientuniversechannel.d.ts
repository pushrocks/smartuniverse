import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { ClientUniverse } from './';
import { ClientUniverseMessage } from './smartuniverse.classes.clientuniversemessage';
export declare class ClientUniverseChannel implements interfaces.IUniverseChannel {
    /**
     * creates a channel and adds it to the cache of clientUniverseArg
     * @param clientUniverseArg
     * @param channelNameArg
     * @param passphraseArg
     */
    static createClientUniverseChannel(clientUniverseArg: ClientUniverse, channelNameArg: string, passphraseArg: string): ClientUniverseChannel;
    name: string;
    passphrase: string;
    status: 'subscribed' | 'unsubscribed';
    private subject;
    clientUniverseRef: ClientUniverse;
    constructor(clientUniverseArg: ClientUniverse, nameArg: string, passphraseArg: string);
    /**
     * subscribes to a channel
     * tells the universe about this instances interest into a channel
     */
    subscribe(observingFunctionArg: (messageArg: ClientUniverseMessage<any>) => void): plugins.smartrx.rxjs.Subscription;
    unsubscribe(): void;
    populateSubscriptionToServer(): Promise<void>;
    emitMessageLocally(messageArg: ClientUniverseMessage<any>): Promise<void>;
    /**
     * sends a message towards the server
     * @param messageArg
     */
    sendMessage(messageArg: interfaces.IMessageCreator): Promise<void>;
}
