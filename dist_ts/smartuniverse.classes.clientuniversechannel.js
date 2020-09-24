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
exports.ClientUniverseChannel = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
class ClientUniverseChannel {
    constructor(clientUniverseArg, nameArg, passphraseArg) {
        this.status = 'unsubscribed';
        this.subject = new plugins.smartrx.rxjs.Subject();
        this.clientUniverseRef = clientUniverseArg;
        this.name = nameArg;
        this.passphrase = passphraseArg;
    }
    // ======
    // STATIC
    // ======
    /**
     * creates a channel and adds it to the cache of clientUniverseArg
     * @param clientUniverseArg
     * @param channelNameArg
     * @param passphraseArg
     */
    static createClientUniverseChannel(clientUniverseArg, channelNameArg, passphraseArg) {
        const clientChannel = new ClientUniverseChannel(clientUniverseArg, channelNameArg, passphraseArg);
        clientUniverseArg.clientUniverseCache.channelMap.add(clientChannel);
        return clientChannel;
    }
    /**
     * subscribes to a channel
     * tells the universe about this instances interest into a channel
     */
    subscribe(observingFunctionArg) {
        return this.subject.subscribe(messageArg => {
            observingFunctionArg(messageArg);
        }, error => console.log(error));
    }
    unsubscribe() {
        // TODO: unsubscribe all users
    }
    async populateSubscriptionToServer() {
        // lets make sure the channel is connected
        if (this.status === 'unsubscribed') {
            const response = await this.clientUniverseRef.smartsocketClient.serverCall('subscribeChannel', {
                name: this.name,
                passphrase: this.passphrase
            });
            this.status = response.subscriptionStatus;
        }
    }
    async emitMessageLocally(messageArg) {
        this.subject.next(messageArg);
    }
    /**
     * sends a message towards the server
     * @param messageArg
     */
    async sendMessage(messageArg) {
        await this.clientUniverseRef.start(); // its ok to call this multiple times
        const universeMessageToSend = {
            id: plugins.smartunique.shortId(),
            timestamp: Date.now(),
            passphrase: this.passphrase,
            targetChannelName: this.name,
            messageText: messageArg.messageText,
            payload: messageArg.payload
        };
        await this.clientUniverseRef.smartsocketClient.serverCall('processMessage', universeMessageToSend);
    }
}
exports.ClientUniverseChannel = ClientUniverseChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLmNsaWVudHVuaXZlcnNlY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy5jbGllbnR1bml2ZXJzZWNoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFtRDtBQVFuRCxNQUFhLHFCQUFxQjtJQXFDaEMsWUFBWSxpQkFBaUMsRUFBRSxPQUFlLEVBQUUsYUFBcUI7UUFOOUUsV0FBTSxHQUFrQyxjQUFjLENBQUM7UUFDdEQsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUE4QixDQUFDO1FBTS9FLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBeENELFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNUOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLDJCQUEyQixDQUN2QyxpQkFBaUMsRUFDakMsY0FBc0IsRUFDdEIsYUFBcUI7UUFFckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxxQkFBcUIsQ0FDN0MsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxhQUFhLENBQ2QsQ0FBQztRQUNGLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEUsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQXFCRDs7O09BR0c7SUFDSSxTQUFTLENBQUMsb0JBQXNFO1FBQ3JGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQzNCLFVBQVUsQ0FBQyxFQUFFO1lBQ1gsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7SUFFTSxXQUFXO1FBQ2hCLDhCQUE4QjtJQUNoQyxDQUFDO0lBRU0sS0FBSyxDQUFDLDRCQUE0QjtRQUN2QywwQ0FBMEM7UUFDMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGNBQWMsRUFBRTtZQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBRXhFLGtCQUFrQixFQUFFO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxVQUFzQztRQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFzQztRQUM3RCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLHFDQUFxQztRQUMzRSxNQUFNLHFCQUFxQixHQUFnQztZQUN6RCxFQUFFLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDakMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJO1lBQzVCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87U0FDNUIsQ0FBQztRQUNGLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FDdkQsZ0JBQWdCLEVBQ2hCLHFCQUFxQixDQUN0QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaEdELHNEQWdHQyJ9