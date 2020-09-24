"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUniverseMessage = void 0;
class ClientUniverseMessage {
    constructor(messageArg) {
        for (const key of Object.keys(messageArg)) {
            this[key] = messageArg[key];
        }
    }
    // ======
    // STATIC
    // ======
    static createMessageFromMessageDescriptor(messageDescriptor) {
        const clientuniverseMessage = new ClientUniverseMessage(messageDescriptor);
        return clientuniverseMessage;
    }
    /**
     * gets json for payload
     */
    getAsJsonForPayload() { }
}
exports.ClientUniverseMessage = ClientUniverseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLmNsaWVudHVuaXZlcnNlbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy5jbGllbnR1bml2ZXJzZW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBYSxxQkFBcUI7SUF1QmhDLFlBQVksVUFBdUM7UUFDakQsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBMUJELFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNGLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxpQkFBOEM7UUFDN0YsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0UsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDO0lBc0JEOztPQUVHO0lBQ0gsbUJBQW1CLEtBQUksQ0FBQztDQUN6QjtBQWpDRCxzREFpQ0MifQ==