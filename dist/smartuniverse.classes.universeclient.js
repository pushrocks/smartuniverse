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
const smartsocket_1 = require("smartsocket");
const url = require("url");
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
                requestBody
            });
        });
    }
    getMessageObservable() {
        if (!this.socketClient && !this.observableIntake) {
            const parsedURL = url.parse(this.options.serverAddress);
            this.socketClient = new smartsocket_1.SmartsocketClient({
                alias: process.env.SOCKET_ALIAS || 'someclient',
                password: 'UniverseClient',
                port: parseInt(parsedURL.port, 10),
                role: 'UniverseClient',
                url: parsedURL.hostname,
            });
            this.observableIntake = new plugins.smartrx.ObservableIntake();
            this.socketClient.connect();
        }
        return this.observableIntake.observable;
    }
}
exports.UniverseClient = UniverseClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtREFBbUQ7QUFJbkQsNkNBQTZEO0FBQzdELDJCQUEyQjtBQVkzQjtJQUtFLFlBQVksVUFBMEI7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDNUIsQ0FBQztJQUVZLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVTs7WUFDN0MsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixPQUFPLEVBQUUsVUFBVTthQUNwQixDQUFDO1lBQ0YsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDMUQsV0FBVzthQUNaLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVNLG9CQUFvQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0JBQWlCLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxZQUFZO2dCQUMvQyxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixHQUFHLEVBQUUsU0FBUyxDQUFDLFFBQVE7YUFDeEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7Q0FDRjtBQWxDRCx3Q0FrQ0MifQ==