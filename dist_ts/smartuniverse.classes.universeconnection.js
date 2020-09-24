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
exports.UniverseConnection = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smartuniverse_classes_universechannel_1 = require("./smartuniverse.classes.universechannel");
/**
 * represents a connection to the universe
 */
class UniverseConnection {
    constructor(optionsArg) {
        this.terminatedDeferred = plugins.smartpromise.defer();
        this.authenticationRequests = [];
        this.authenticatedChannels = [];
        this.failedToJoinChannels = [];
        this.universeRef = optionsArg.universe;
        this.authenticationRequests = optionsArg.authenticationRequests;
        this.socketConnection = optionsArg.socketConnection;
        this.socketConnection.eventSubject.subscribe(async (eventArg) => {
            switch (eventArg) {
                case 'disconnected':
                    await this.disconnect('upstreamevent');
                    break;
            }
        });
    }
    /**
     *
     * @param universeConnectionArg
     */
    static async addConnectionToCache(universeRef, universeConnectionArg) {
        let universeConnection = universeConnectionArg;
        universeConnection = await UniverseConnection.deduplicateUniverseConnection(universeRef.universeCache, universeConnection);
        universeConnection = await UniverseConnection.authenticateAuthenticationRequests(universeRef, universeConnection);
        universeRef.universeCache.connectionMap.add(universeConnection);
        console.log('hi');
    }
    /**
     * deduplicates UniverseConnections
     */
    static async deduplicateUniverseConnection(universeCache, universeConnectionArg) {
        let connectionToReturn;
        universeCache.connectionMap.forEach(async (existingConnection) => {
            if (existingConnection.socketConnection === universeConnectionArg.socketConnection) {
                connectionToReturn = await this.mergeUniverseConnections(existingConnection, universeConnectionArg);
            }
        });
        if (!connectionToReturn) {
            connectionToReturn = universeConnectionArg;
        }
        return connectionToReturn;
    }
    /**
     * authenticate AuthenticationRequests
     */
    static async authenticateAuthenticationRequests(universeRef, universeConnectionArg) {
        for (const authenticationRequest of universeConnectionArg.authenticationRequests) {
            const universeChannelToAuthenticateAgainst = smartuniverse_classes_universechannel_1.UniverseChannel.getUniverseChannelByName(universeRef, authenticationRequest.name);
            if (universeChannelToAuthenticateAgainst.passphrase === authenticationRequest.passphrase) {
                universeConnectionArg.authenticatedChannels.push(universeChannelToAuthenticateAgainst);
            }
        }
        return universeConnectionArg;
    }
    /**
     * merges two UniverseConnections
     */
    static mergeUniverseConnections(connectionArg1, connectionArg2) {
        return connectionArg1;
    }
    /**
     * finds a UniverseConnection by providing a socket connection
     */
    static findUniverseConnectionBySocketConnection(universeCache, socketConnectionArg) {
        const universeConnection = universeCache.connectionMap.find(universeConnectionArg => {
            return universeConnectionArg.socketConnection === socketConnectionArg;
        });
        return universeConnection;
    }
    /**
     * disconnect the connection
     */
    async disconnect(reason = 'triggered') {
        if (reason === 'triggered') {
            await this.socketConnection.disconnect();
        }
        this.universeRef.universeCache.connectionMap.remove(this);
        this.terminatedDeferred.resolve();
    }
}
exports.UniverseConnection = UniverseConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy51bml2ZXJzZWNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFtRDtBQUVuRCxtR0FBMEU7QUFJMUU7O0dBRUc7QUFDSCxNQUFhLGtCQUFrQjtJQTZHN0IsWUFBWSxVQUlYO1FBekJNLHVCQUFrQixHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFNbEQsMkJBQXNCLEdBQWlFLEVBQUUsQ0FBQztRQUMxRiwwQkFBcUIsR0FBc0IsRUFBRSxDQUFDO1FBQzlDLHlCQUFvQixHQUFzQixFQUFFLENBQUM7UUFrQmxELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFO1lBQzVELFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLGNBQWM7b0JBQ2pCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDdkMsTUFBTTthQUNUO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBM0hEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQ3RDLFdBQXFCLEVBQ3JCLHFCQUF5QztRQUV6QyxJQUFJLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDO1FBQy9DLGtCQUFrQixHQUFHLE1BQU0sa0JBQWtCLENBQUMsNkJBQTZC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