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
exports.Universe = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const _1 = require("./");
const paths = __importStar(require("./smartuniverse.paths"));
const smartuniverse_classes_universeconnection_1 = require("./smartuniverse.classes.universeconnection");
const smartuniverse_logging_1 = require("./smartuniverse.logging");
/**
 * main class that setups a Universe
 */
class Universe {
    constructor(optionsArg) {
        this.options = optionsArg;
        this.universeCache = new _1.UniverseCache(this, this.options.messageExpiryInMilliseconds);
    }
    /**
     * get the currently running version of smartuniverse
     */
    getUniverseVersion() {
        if (this.universeVersionStore) {
            return this.universeVersionStore;
        }
        else {
            const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
            this.universeVersionStore = packageJson.version;
            return this.universeVersionStore;
        }
    }
    /**
     * adds a channel to the Universe
     */
    addChannel(nameArg, passphraseArg) {
        const newChannel = _1.UniverseChannel.createChannel(this, nameArg, passphraseArg);
        return newChannel;
    }
    /**
     * returns a channel
     */
    getChannel(channelNameArg) {
        return this.universeCache.channelMap.find(channelArg => {
            return channelArg.name === channelNameArg;
        });
    }
    /**
     * initiates a server
     */
    async start(portArg) {
        // lets create the base smartexpress server
        if (!this.options.externalServer) {
            this.smartexpressServer = new plugins.smartexpress.Server({
                cors: true,
                defaultAnswer: async () => {
                    return `smartuniverse server ${this.getUniverseVersion()}`;
                },
                forceSsl: false,
                port: portArg
            });
        }
        else {
            console.log('Universe is using externally supplied server');
            this.smartexpressServer = this.options.externalServer;
        }
        // add websocket upgrade
        this.smartsocket = new plugins.smartsocket.Smartsocket({});
        // add a role for the clients
        const ClientRole = new plugins.smartsocket.SocketRole({
            name: 'UniverseClient',
            passwordHash: plugins.smarthash.sha256FromStringSync('UniverseClient') // authentication happens on another level
        });
        // add the role to smartsocket
        this.smartsocket.addSocketRoles([ClientRole]);
        const socketFunctionSubscription = new plugins.smartsocket.SocketFunction({
            allowedRoles: [ClientRole],
            funcName: 'subscribeChannel',
            funcDef: async (dataArg, socketConnectionArg) => {
                const universeConnection = new smartuniverse_classes_universeconnection_1.UniverseConnection({
                    universe: this,
                    socketConnection: socketConnectionArg,
                    authenticationRequests: [dataArg]
                });
                await smartuniverse_classes_universeconnection_1.UniverseConnection.addConnectionToCache(this, universeConnection);
                return {
                    subscriptionStatus: 'subscribed'
                };
            }
        });
        const socketFunctionProcessMessage = new plugins.smartsocket.SocketFunction({
            allowedRoles: [ClientRole],
            funcName: 'processMessage',
            funcDef: async (dataArg, socketConnectionArg) => {
                const universeConnection = smartuniverse_classes_universeconnection_1.UniverseConnection.findUniverseConnectionBySocketConnection(this.universeCache, socketConnectionArg);
                if (universeConnection) {
                    smartuniverse_logging_1.logger.log('ok', 'found UniverseConnection for socket for incoming message');
                }
                else {
                    smartuniverse_logging_1.logger.log('warn', 'found no Authorized channel for incoming message');
                    return {
                        error: 'You need to authenticate for a channel'
                    };
                }
                const unauthenticatedMessage = _1.UniverseMessage.createMessageFromPayload(socketConnectionArg, dataArg);
                const foundChannel = await _1.UniverseChannel.authorizeAMessageForAChannel(this.universeCache, unauthenticatedMessage);
                if (foundChannel && unauthenticatedMessage.authenticated) {
                    const authenticatedMessage = unauthenticatedMessage;
                    await this.universeCache.addMessage(authenticatedMessage);
                }
            }
        });
        // add socket functions
        this.smartsocket.addSocketFunction(socketFunctionSubscription);
        this.smartsocket.addSocketFunction(socketFunctionProcessMessage);
        // start the server
        if (!this.options.externalServer) {
            await this.smartexpressServer.start();
        }
        // add smartsocket to the running smartexpress app
        await this.smartsocket.setExternalServer('smartexpress', this.smartexpressServer);
        await this.smartsocket.start();
        smartuniverse_logging_1.logger.log('success', 'started universe');
    }
    /**
     * stop everything
     */
    async stopServer() {
        await this.smartsocket.stop();
        if (!this.options.externalServer) {
            await this.smartexpressServer.stop();
        }
    }
}
exports.Universe = Universe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBbUQ7QUFHbkQseUJBQXFFO0FBRXJFLDZEQUErQztBQUcvQyx5R0FBZ0Y7QUFDaEYsbUVBQWlEO0FBT2pEOztHQUVHO0FBQ0gsTUFBYSxRQUFRO0lBaUJuQixZQUFZLFVBQTRDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxnQkFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekYsQ0FBQztJQVFEOztPQUVHO0lBQ0ksa0JBQWtCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ2xDO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2hELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVSxDQUFDLE9BQWUsRUFBRSxhQUFxQjtRQUN0RCxNQUFNLFVBQVUsR0FBRyxrQkFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVUsQ0FBQyxjQUFzQjtRQUN0QyxPQUFPLElBQUksQ0FB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