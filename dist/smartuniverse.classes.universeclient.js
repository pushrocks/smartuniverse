"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartuniverse.plugins");
class UniverseClient {
    constructor(optionsArg) {
        this.options = optionsArg;
    }
    sendMessage(message, messagePayload) {
        plugins.smartrequest.post(this.options.serverAddress, {
            requestBody: messagePayload
        });
    }
    getMessageObservable() {
    }
}
exports.UniverseClient = UniverseClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQW1EO0FBU25EO0lBR0UsWUFBWSxVQUEwQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQU8sRUFBRSxjQUFjO1FBQ3hDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ3BELFdBQVcsRUFBRSxjQUFjO1NBQzVCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxvQkFBb0I7SUFFM0IsQ0FBQztDQUNGO0FBaEJELHdDQWdCQyJ9