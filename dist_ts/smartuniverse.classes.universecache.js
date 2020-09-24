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
exports.UniverseCache = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smartuniverse_classes_universechannel_1 = require("./smartuniverse.classes.universechannel");
const lik_1 = require("@pushrocks/lik");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * universe store handles the creation, storage and retrieval of messages.
 */
class UniverseCache {
    constructor(universeArg, standardMessageExpiryArg) {
        this.destructionTime = 10000;
        /**
         * stores messages for this instance
         */
        this.messageMap = new lik_1.ObjectMap();
        /**
         * stores the channels that are available within the universe
         */
        this.channelMap = new lik_1.ObjectMap();
        /**
         * stores all connections
         */
        this.connectionMap = new plugins.lik.ObjectMap();
        this.universeRef = universeArg;
        this.standardMessageExpiry = standardMessageExpiryArg;
        this.blackListChannel = new smartuniverse_classes_universechannel_1.UniverseChannel(this.universeRef, 'blacklist', 'nada');
    }
    /**
     * add a message to the UniverseCache
     * @param messageArg
     * @param attachedPayloadArg
     */
    async addMessage(messageArg) {
        messageArg.setUniverseCache(this);
        smartuniverse_classes_universechannel_1.UniverseChannel.authorizeAMessageForAChannel(this, messageArg);
        this.messageMap.add(messageArg);
        messageArg.universeChannelList.forEach(universeChannel => {
            universeChannel.push(messageArg);
        });
    }
    /**
     * Read a message from the UniverseCache
     */
    readMessagesYoungerThan(unixTimeArg, channelName) {
        const messageObservable = rxjs_1.from(this.messageMap.getArray()).pipe(operators_1.filter(messageArg => {
            return messageArg.smartTimestamp.isYoungerThanMilliSeconds(this.destructionTime);
        }));
        return messageObservable;
    }
}
exports.UniverseCache = UniverseCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMudW5pdmVyc2VjYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQW1EO0FBRW5ELG1HQUEwRTtBQUcxRSx3Q0FBMkM7QUFFM0MsK0JBQXdDO0FBQ3hDLDhDQUF3QztBQUt4Qzs7R0FFRztBQUNILE1BQWEsYUFBYTtJQTZCeEIsWUFBWSxXQUFxQixFQUFFLHdCQUFnQztRQXhCNUQsb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFFdkM7O1dBRUc7UUFDSSxlQUFVLEdBQUcsSUFBSSxlQUFTLEVBQXdCLENBQUM7UUFFMUQ7O1dBRUc7UUFDSSxlQUFVLEdBQUcsSUFBSSxlQUFTLEVBQW1CLENBQUM7UUFFckQ7O1dBRUc7UUFDSSxrQkFBYSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQXNCLENBQUM7UUFVckUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHdCQUF3QixDQUFDO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHVEQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQWdDO1FBQ3RELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyx1REFBZSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3ZELGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBdUIsQ0FDNUIsV0FBb0IsRUFDcEIsV0FBb0I7UUFFcEIsTUFBTSxpQkFBaUIsR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDN0Qsa0JBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQixPQUFPLFVBQVUsQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUNILENBQUM7UUFDRixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQS9ERCxzQ0ErREMifQ==