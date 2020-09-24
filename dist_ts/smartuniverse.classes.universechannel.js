"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniverseChannel = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smartuniverse_classes_universemessage_1 = require("./smartuniverse.classes.universemessage");
const smartuniverse_logging_1 = require("./smartuniverse.logging");
/**
 * enables messages to stay within a certain scope.
 */
class UniverseChannel {
    constructor(universeArg, channelNameArg, passphraseArg) {
        this.subject = new plugins.smartrx.rxjs.Subject();
        this.universeRef = universeArg;
        this.name = channelNameArg;
        this.passphrase = passphraseArg;
    }
    // ======
    // STATIC
    // ======
    /**
     * creates new channels
     * @param channelArg the name of the topic
     * @param passphraseArg the secret thats used for a certain topic.
     */
    static createChannel(universeArg, channelNameArg, passphraseArg) {
        const newChannel = new UniverseChannel(universeArg, channelNameArg, passphraseArg);
        universeArg.universeCache.channelMap.add(newChannel);
        return newChannel;
    }
    /**
     * returns boolean wether certain channel exists
     */
    static async doesChannelExists(universeCacheArg, channelNameArg) {
        const channel = universeCacheArg.channelMap.find(channelArg => {
            return channelArg.name === channelNameArg;
        });
        if (channel) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * a static message authorization function that takes the  UniverseCache
     * (where messages and channels are stored and their lifetime is managed)
     * and the universemessage to find a fitting channel for the message
     * @param universeCacheArg
     * @param universeMessageArg
     */
    static authorizeAMessageForAChannel(universeCacheArg, universeMessageArg) {
        const foundChannel = universeCacheArg.channelMap.find(universeChannel => {
            const result = universeChannel.authenticate(universeMessageArg);
            return result;
        });
        if (foundChannel) {
            universeMessageArg.authenticated = true;
            universeMessageArg.universeChannelList.add(foundChannel);
            smartuniverse_logging_1.logger.log('ok', 'message authorized');
            return foundChannel;
        }
        else {
            universeMessageArg.authenticated = false;
            universeMessageArg.universeChannelList.add(universeCacheArg.blackListChannel);
            smartuniverse_logging_1.logger.log('warn', 'message not valid');
            return null;
        }
    }
    static getUniverseChannelByName(universeRef, universeChannelName) {
        return universeRef.universeCache.channelMap.find(channelArg => {
            return channelArg.name === universeChannelName;
        });
    }
    /**
     * authenticates a client on the server side by matching
     * # the messages channelName against the unverseChannel's name
     * # the messages password against the universeChannel's password
     */
    authenticate(universeMessageArg) {
        return (this.name === universeMessageArg.targetChannelName &&
            this.passphrase === universeMessageArg.passphrase);
    }
    /**
     * pushes a message to clients
     * @param messageArg
     */
    async push(messageArg) {
        this.subject.next(messageArg);
        const universeConnectionsWithChannelAccess = [];
        await this.universeRef.universeCache.connectionMap.forEach(async (socketConnection) => {
            if (socketConnection.authenticatedChannels.includes(this)) {
                universeConnectionsWithChannelAccess.push(socketConnection);
            }
        });
        for (const universeConnection of universeConnectionsWithChannelAccess) {
            const smartsocket = universeConnection.socketConnection
                .smartsocketRef;
            const universeMessageToSend = {
                id: messageArg.id,
                timestamp: messageArg.timestamp,
                passphrase: messageArg.passphrase,
                targetChannelName: this.name,
                messageText: messageArg.messageText,
                payload: messageArg.payload
            };
            smartsocket.clientCall('processMessage', universeMessageToSend, universeConnection.socketConnection);
        }
    }
    // functions to interact with a channel locally
    subscribe(observingFunctionArg) {
        return this.subject.subscribe(messageArg => {
            observingFunctionArg(messageArg);
        }, error => console.log(error));
    }
    /**
     * sends a message to the channel
     */
    async sendMessage(messageDescriptor) {
        const messageToSend = new smartuniverse_classes_universemessage_1.UniverseMessage({
            id: plugins.smartunique.shortId(),
            messageText: messageDescriptor.messageText,
            payload: messageDescriptor.payload,
            targetChannelName: this.name,
            passphrase: this.passphrase,
            timestamp: Date.now()
        });
        this.universeRef.universeCache.addMessage(messageToSend);
    }
}
exports.UniverseChannel = UniverseChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy51bml2ZXJzZWNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFtRDtBQUluRCxtR0FBMEU7QUFHMUUsbUVBQWlEO0FBRWpEOztHQUVHO0FBQ0gsTUFBYSxlQUFlO0lBbUYxQixZQUFZLFdBQXFCLEVBQUUsY0FBc0IsRUFBRSxhQUFxQjtRQVB4RSxZQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQXdCLENBQUM7UUFRekUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQXRGRCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFFVDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FDekIsV0FBcUIsRUFDckIsY0FBc0IsRUFDdEIsYUFBcUI7UUFFckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRixXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBK0IsRUFBRSxjQUFzQjtRQUMzRixNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVELE9BQU8sVUFBVSxDQUFDLElBQUks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