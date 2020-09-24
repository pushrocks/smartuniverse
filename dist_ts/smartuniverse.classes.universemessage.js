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
exports.UniverseMessage = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smarttime_1 = require("@pushrocks/smarttime");
const smartuniverse_logging_1 = require("./smartuniverse.logging");
/**
 * represents a message within a universe
 * acts as a container to save message states like authentication status
 */
class UniverseMessage {
    /**
     * the constructor to create a universe message
     * @param messageArg
     * @param attachedPayloadArg
     */
    constructor(messageDescriptor) {
        /**
         * enables unprotected grouping of messages for efficiency purposes.
         */
        this.universeChannelList = new plugins.lik.ObjectMap();
        /**
         * wether the message is authenticated
         */
        this.authenticated = false;
        this.smartTimestamp = new smarttime_1.TimeStamp(this.timestamp);
        this.messageText = messageDescriptor.messageText;
        this.targetChannelName = messageDescriptor.targetChannelName;
        this.passphrase = messageDescriptor.passphrase;
        this.payload = messageDescriptor.payload;
        // prevent memory issues
        this.setDestructionTimer();
    }
    static createMessageFromPayload(socketConnectionArg, dataArg) {
        const universeMessageInstance = new UniverseMessage(dataArg);
        universeMessageInstance.socketConnection = socketConnectionArg;
        return universeMessageInstance;
    }
    setUniverseCache(universeCacheArg) {
        this.universeCache = universeCacheArg;
    }
    setTargetChannel() { }
    setDestructionTimer(selfdestructAfterArg) {
        if (selfdestructAfterArg) {
            this.destructionTimer = new smarttime_1.Timer(selfdestructAfterArg);
            this.destructionTimer.start();
            // set up self destruction by removing this from the parent messageCache
            this.destructionTimer.completed
                .then(async () => {
                this.universeCache.messageMap.remove(this);
            })
                .catch(err => {
                console.log(err);
                console.log(this);
            });
        }
        else {
            plugins.smartdelay.delayFor(1000).then(() => {
                if (!this.destructionTimer) {
                    this.setDestructionTimer(6000);
                }
            });
        }
    }
    /**
     * handles bad messages for further analysis
     */
    handleAsBadMessage() {
        smartuniverse_logging_1.logger.log('warn', 'received a bad message');
    }
}
exports.UniverseMessage = UniverseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy51bml2ZXJzZW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFtRDtBQUduRCxvREFBd0Q7QUFLeEQsbUVBQWlEO0FBRWpEOzs7R0FHRztBQUNILE1BQWEsZUFBZTtJQXVDMUI7Ozs7T0FJRztJQUNILFlBQVksaUJBQThDO1FBcEIxRDs7V0FFRztRQUNJLHdCQUFtQixHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQW1CLENBQUM7UUFFMUU7O1dBRUc7UUFDSSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQWFwQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ3pDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBbkRNLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDcEMsbUJBQXFDLEVBQ3JDLE9BQW9DO1FBRXBDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsdUJBQXVCLENBQUMsZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUM7UUFDL0QsT0FBTyx1QkFBdUIsQ0FBQztJQUNqQyxDQUFDO0lBOENNLGdCQUFnQixDQUFDLGdCQUErQjtRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQkFBZ0IsS0FBSSxDQUFDO0lBRXJCLG1CQUFtQixDQUFDLG9CQUE2QjtRQUN0RCxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlCQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUIsd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTO2lCQUM1QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFrQjtRQUN2Qiw4QkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7QUF4RkQsMENBd0ZDIn0=