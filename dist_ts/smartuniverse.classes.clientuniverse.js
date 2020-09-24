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
exports.ClientUniverse = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smartsocket_1 = require("@pushrocks/smartsocket");
const url = __importStar(require("url"));
const _1 = require("./");
const smartuniverse_classes_clientuniversecache_1 = require("./smartuniverse.classes.clientuniversecache");
const smartuniverse_logging_1 = require("./smartuniverse.logging");
/**
 * this class is for client side only!!!
 * allows connecting to a universe server
 */
class ClientUniverse {
    constructor(optionsArg) {
        this.messageRxjsSubject = new plugins.smartrx.rxjs.Subject();
        this.clientUniverseCache = new smartuniverse_classes_clientuniversecache_1.ClientUniverseCache();
        this.autoReconnectStatus = 'off';
        this.options = optionsArg;
    }
    /**
     * adds a channel to the channelcache
     * TODO: verify channel before adding it to the channel cache
     */
    addChannel(channelNameArg, passphraseArg) {
        const existingChannel = this.getChannel(channelNameArg);
        if (existingChannel) {
            throw new Error('channel exists');
        }
        // lets create the channel
        const clientUniverseChannel = _1.ClientUniverseChannel.createClientUniverseChannel(this, channelNameArg, passphraseArg);
        return clientUniverseChannel;
    }
    /**
     * gets a channel from the channelcache
     * @param channelName
     * @param passphraseArg
     */
    getChannel(channelName) {
        const clientUniverseChannel = this.clientUniverseCache.channelMap.find(channel => {
            return channel.name === channelName;
        });
        return clientUniverseChannel;
    }
    /**
     * remove a a achannel
     * @param messageArg
     */
    removeChannel(channelNameArg, notifyServer = true) {
        const clientUniverseChannel = this.clientUniverseCache.channelMap.findOneAndRemove(channelItemArg => {
            return channelItemArg.name === channelNameArg;
        });
    }
    async start() {
        if (this.options.autoReconnect) {
            this.autoReconnectStatus = 'on';
        }
        await this.checkConnection();
    }
    async stop() {
        this.autoReconnectStatus = 'off';
        await this.disconnect('triggered');
    }
    /**
     * checks the connection towards a universe server
     * since password validation is done through other means, a connection should always be possible
     */
    async checkConnection() {
        if (!this.smartsocketClient) {
            const parsedURL = url.parse(this.options.serverAddress);
            const socketConfig = {
                alias: 'universeclient',
                password: 'UniverseClient',
                port: parseInt(parsedURL.port, 10),
                role: 'UniverseClient',
                url: parsedURL.protocol + '//' + parsedURL.hostname
            };
            this.smartsocketClient = new smartsocket_1.SmartsocketClient(socketConfig);
            this.smartsocketClient.eventSubject.subscribe(async (eventArg) => {
                switch (eventArg) {
                    case 'disconnected':
                        this.disconnect('upstreamEvent');
                }
            });
            // lets define some basic actions
            /**
             * should handle a forced unsubscription by the server
             */
            const socketFunctionUnsubscribe = new plugins.smartsocket.SocketFunction({
                funcName: 'unsubscribe',
                allowedRoles: [],
                funcDef: async (dataArg) => {
                    const channel = this.clientUniverseCache.channelMap.find(channelArg => {
                        return channelArg.name === dataArg.name;
                    });
                    if (channel) {
                        channel.unsubscribe();
                    }
                    return {};
                }
            });
            /**
             * handles message reception
             */
            const socketFunctionProcessMessage = new plugins.smartsocket.SocketFunction({
                funcName: 'processMessage',
                allowedRoles: [],
                funcDef: async (messageDescriptorArg) => {
                    smartuniverse_logging_1.logger.log('info', 'Got message from server');
                    const clientUniverseMessage = _1.ClientUniverseMessage.createMessageFromMessageDescriptor(messageDescriptorArg);
                    this.messageRxjsSubject.next(clientUniverseMessage);
                    // lets find the corresponding channel
                    const targetChannel = this.getChannel(clientUniverseMessage.targetChannelName);
                    if (targetChannel) {
                        await targetChannel.emitMessageLocally(clientUniverseMessage);
                        return {
                            messageStatus: 'ok'
                        };
                    }
                    else {
                        return {
                            messageStatus: 'channel not found'
                        };
                    }
                }
            });
            // add functions
            this.smartsocketClient.addSocketFunction(socketFunctionUnsubscribe);
            this.smartsocketClient.addSocketFunction(socketFunctionProcessMessage);
            await this.smartsocketClient.connect();
            smartuniverse_logging_1.logger.log('info', 'universe client connected successfully');
            await this.clientUniverseCache.channelMap.forEach(async (clientUniverseChannelArg) => {
                await clientUniverseChannelArg.populateSubscriptionToServer();
            });
        }
    }
    async disconnect(reason = 'triggered', tryReconnect = false) {
        const instructDisconnect = async () => {
            if (this.smartsocketClient) {
                const smartsocketToDisconnect = this.smartsocketClient;
                this.smartsocketClient = null; // making sure the upstreamEvent does  not interfere
                await smartsocketToDisconnect.disconnect();
            }
        };
        if (reason === 'triggered' && this.smartsocketClient) {
            await instructDisconnect();
        }
        if (this.autoReconnectStatus === 'on' && reason === 'upstreamEvent') {
            await instructDisconnect();
            await plugins.smartdelay.delayForRandom(5000, 20000);
            await this.checkConnection();
        }
    }
}
exports.ClientUniverse = ClientUniverse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLmNsaWVudHVuaXZlcnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLmNsaWVudHVuaXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBbUQ7QUFHbkQsd0RBQXdFO0FBQ3hFLHlDQUEyQjtBQUkzQix5QkFBa0U7QUFDbEUsMkdBQWtGO0FBQ2xGLG1FQUFpRDtBQU9qRDs7O0dBR0c7QUFDSCxNQUFhLGNBQWM7SUFRekIsWUFBWSxVQUEwQjtRQUwvQix1QkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBOEIsQ0FBQztRQUNwRix3QkFBbUIsR0FBRyxJQUFJLCtEQUFtQixFQUFFLENBQUM7UUFFaEQsd0JBQW1CLEdBQWlCLEtBQUssQ0FBQztRQUcvQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksVUFBVSxDQUFDLGNBQXNCLEVBQUUsYUFBcUI7UUFDN0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbkM7UUFFRCwwQkFBMEI7UUFDMUIsTUFBTSxxQkFBcUIsR0FBRyx3QkFBcUIsQ0FBQywyQkFBMkIsQ0FDN0UsSUFBSSxFQUNKLGNBQWMsRUFDZCxhQUFhLENBQ2QsQ0FBQztRQUNGLE9BQU8scUJBQXFCLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsV0FBbUI7UUFDbkMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFB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