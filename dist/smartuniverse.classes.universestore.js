"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartuniverse_classes_universemessage_1 = require("./smartuniverse.classes.universemessage");
const lik_1 = require("lik");
const smartrx_1 = require("smartrx");
class UniverseStore {
    constructor(standardMessageExpiryArg) {
        this.destructionTime = 60000;
        this.messageStore = new lik_1.Objectmap();
        this.lastId = 0; // stores the last id
        this.standardMessageExpiry = standardMessageExpiryArg;
    }
    /**
     * add a message to the UniverseStore
     * @param messageArg
     * @param attachedPayloadArg
     */
    addMessage(messageArg, attachedPayloadArg) {
        this.messageStore.add(new smartuniverse_classes_universemessage_1.UniverseMessage(this, messageArg, attachedPayloadArg, this.destructionTime));
    }
    /**
     * Read a message from the UniverseStore
     */
    readMessagesYoungerThan(unixTimeArg) {
        const messageObservable = smartrx_1.rxjs.Observable.from(this.messageStore.getArray()).filter(messageArg => {
            return messageArg.timestamp.isYoungerThanMilliSeconds(this.destructionTime);
        });
        return messageObservable;
    }
}
exports.UniverseStore = UniverseStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMudW5pdmVyc2VzdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG1HQUEwRTtBQUUxRSw2QkFBZ0M7QUFHaEMscUNBQStCO0FBRS9CO0lBTUUsWUFBWSx3QkFBZ0M7UUFKckMsb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFDaEMsaUJBQVksR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQztRQUMvQyxXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBRy9DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLHVEQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ2hGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBdUIsQ0FBQyxXQUFvQjtRQUNqRCxNQUFNLGlCQUFpQixHQUFHLGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQ2pGLFVBQVUsQ0FBQyxFQUFFO1lBQ1gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQWhDRCxzQ0FnQ0MifQ==