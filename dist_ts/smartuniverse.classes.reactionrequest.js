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
exports.ReactionRequest = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
const smartuniverse_classes_reactionresult_1 = require("./smartuniverse.classes.reactionresult");
class ReactionRequest {
    constructor(optionsArg) {
        this.method = optionsArg.method;
    }
    async fire(channelsArg, requestDataArg, timeoutMillisArg = 5000) {
        const subscriptionMap = new plugins.lik.ObjectMap();
        const reactionResult = new smartuniverse_classes_reactionresult_1.ReactionResult();
        const requestId = plugins.smartunique.shortId();
        for (const channel of channelsArg) {
            subscriptionMap.add(channel.subscribe((messageArg) => {
                if (messageArg.messageText === 'reactionResponse' &&
                    messageArg.payload.typedRequestPayload.method === this.method) {
                    const payload = messageArg.payload;
                    if (payload.id !== requestId) {
                        return;
                    }
                    reactionResult.pushReactionResponse(payload.typedRequestPayload.response);
                }
            }));
            const payload = {
                id: requestId,
                typedRequestPayload: {
                    method: this.method,
                    request: requestDataArg,
                    response: null
                }
            };
            channel.sendMessage({
                messageText: 'reactionRequest',
                payload
            });
        }
        plugins.smartdelay.delayFor(timeoutMillisArg).then(async () => {
            await subscriptionMap.forEach(subscriptionArg => {
                subscriptionArg.unsubscribe();
            });
            reactionResult.complete();
        });
        return reactionResult;
    }
}
exports.ReactionRequest = ReactionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnJlYWN0aW9ucmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy5yZWFjdGlvbnJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFtRDtBQUduRCxpR0FBd0U7QUFzQnhFLE1BQWEsZUFBZTtJQUcxQixZQUFZLFVBQWlEO1FBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FDZixXQUEyRCxFQUMzRCxjQUE0QixFQUM1QixnQkFBZ0IsR0FBRyxJQUFJO1FBRXZCLE1BQU0sZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQXFDLENBQUM7UUFDdkYsTUFBTSxjQUFjLEdBQUcsSUFBSSxxREFBYyxFQUFLLENBQUM7UUFDL0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoRCxLQUFLLE1BQU0sT0FBTyxJQUFJLFdBQVcsRUFBRTtZQUNqQyxlQUFlLENBQUMsR0FBRyxDQUNqQixPQUFPLENBQUMsU0FBUyxDQUNmLENBQ0UsVUFFZ0QsRUFDaEQsRUFBRTtnQkFDRixJQUNFLFVBQVUsQ0FBQyxXQUFXLEtBQUssa0JBQWtCO29CQUM3QyxVQUFVLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUM3RDtvQkFDQSxNQUFNLE9BQU8sR0FBMEIsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQkFDMUQsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBRTt3QkFDNUIsT0FBTztxQkFDUjtvQkFDRCxjQUFjLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzRTtZQUNILENBQUMsQ0FDRixDQUNGLENBQUM7WUFDRixNQUFNLE9BQU8sR0FBMEI7Z0JBQ3JDLEVBQUUsRUFBRSxTQUFTO2dCQUNiLG1CQUFtQixFQUFFO29CQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUNsQixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1RCxNQUFNLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQzlDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQXpERCwwQ0F5REMifQ==