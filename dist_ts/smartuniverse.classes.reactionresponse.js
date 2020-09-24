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
exports.ReactionResponse = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
class ReactionResponse {
    constructor(optionsArg) {
        this.channels = new plugins.lik.ObjectMap();
        this.method = optionsArg.method;
        this.channels.addArray(optionsArg.channels);
        this.funcDef = optionsArg.funcDef;
        for (const channel of this.channels.getArray()) {
            channel.subscribe(messageArg => {
                this.processMessageForReaction(channel, messageArg);
            });
        }
    }
    async processMessageForReaction(channelArg, messageArg) {
        if (messageArg.messageText === 'reactionRequest' &&
            messageArg.payload.typedRequestPayload.method === this.method) {
            const response = await this.funcDef(messageArg.payload.typedRequestPayload.request);
            const payload = Object.assign(Object.assign({}, messageArg.payload), { typedRequestPayload: Object.assign(Object.assign({}, messageArg.payload.typedRequestPayload), { response }) });
            channelArg.sendMessage({
                messageText: 'reactionResponse',
                payload
            });
        }
    }
}
exports.ReactionResponse = ReactionResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnJlYWN0aW9ucmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMucmVhY3Rpb25yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQW1EO0FBb0JuRCxNQUFhLGdCQUFnQjtJQUszQixZQUFZLFVBQWtEO1FBSHZELGFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUEyQyxDQUFDO1FBSXJGLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM5QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLHlCQUF5QixDQUNyQyxVQUFtRCxFQUNuRCxVQUVnRDtRQUVoRCxJQUNFLFVBQVUsQ0FBQyxXQUFXLEtBQUssaUJBQWlCO1lBQzVDLFVBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQzdEO1lBQ0EsTUFBTSxRQUFRLEdBQWtCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQy9DLENBQUM7WUFDRixNQUFNLE9BQU8sbUNBQ1IsVUFBVSxDQUFDLE9BQU8sS0FDckIsbUJBQW1CLGtDQUNkLFVBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEtBQ3pDLFFBQVEsTUFFWCxDQUFDO1lBQ0YsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQkFDckIsV0FBVyxFQUFFLGtCQUFrQjtnQkFDL0IsT0FBTzthQUNSLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGO0FBMUNELDRDQTBDQyJ9