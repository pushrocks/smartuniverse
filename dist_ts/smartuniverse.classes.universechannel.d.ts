import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { UniverseCache } from './smartuniverse.classes.universecache';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { Universe } from './smartuniverse.classes.universe';
/**
 * enables messages to stay within a certain scope.
 */
export declare class UniverseChannel {
    /**
     * creates new channels
     * @param channelArg the name of the topic
     * @param passphraseArg the secret thats used for a certain topic.
     */
    static createChannel(universeArg: Universe, channelNameArg: string, passphraseArg: string): UniverseChannel;
    /**
     * returns boolean wether certain channel exists
     */
    static doesChannelExists(universeCacheArg: UniverseCache, channelNameArg: string): Promise<boolean>;
    /**
     * a static message authorization function that takes the  UniverseCache
     * (where messages and channels are stored and their lifetime is managed)
     * and the universemessage to find a fitting channel for the message
     * @param universeCacheArg
     * @param universeMessageArg
     */
    static authorizeAMessageForAChannel(universeCacheArg: UniverseCache, universeMessageArg: UniverseMessage<any>): UniverseChannel;
    static getUniverseChannelByName(universeRef: Universe, universeChannelName: string): UniverseChannel;
    /**
     * the name of the channel
     */
    name: string;
    universeRef: Universe;
    private subject;
    /**
     * the passphrase for the channel
     */
    passphrase: string;
    constructor(universeArg: Universe, channelNameArg: string, passphraseArg: string);
    /**
     * authenticates a client on the server side by matching
     * # the messages channelName against the unverseChannel's name
     * # the messages password against the universeChannel's password
     */
    authenticate(universeMessageArg: UniverseMessage<any>): boolean;
    /**
     * pushes a message to clients
     * @param messageArg
     */
    push(messageArg: UniverseMessage<any>): Promise<void>;
    subscribe(observingFunctionArg: (messageArg: UniverseMessage<any>) => void): plugins.smartrx.rxjs.Subscription;
    /**
     * sends a message to the channel
     */
    sendMessage(messageDescriptor: interfaces.IMessageCreator): Promise<void>;
}
