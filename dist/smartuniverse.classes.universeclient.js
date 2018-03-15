"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartuniverse.plugins");
class UniverseClient {
    constructor(optionsArg) {
        this.options = optionsArg;
    }
    sendMessage(messageArg, payloadArg) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = {
                message: messageArg,
                payload: payloadArg
            };
            yield plugins.smartrequest.post(this.options.serverAddress, {
                requestBody: requestBody
            });
        });
    }
    getMessageObservable() {
    }
}
exports.UniverseClient = UniverseClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtREFBbUQ7QUFTbkQ7SUFHRSxZQUFZLFVBQTBCO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQzVCLENBQUM7SUFFWSxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVU7O1lBQzdDLE1BQU0sV0FBVyxHQUFHO2dCQUNsQixPQUFPLEVBQUUsVUFBVTtnQkFDbkIsT0FBTyxFQUFFLFVBQVU7YUFDcEIsQ0FBQTtZQUNELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JBQzFELFdBQVcsRUFBRSxXQUFXO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUVNLG9CQUFvQjtJQUUzQixDQUFDO0NBQ0Y7QUFwQkQsd0NBb0JDIn0=