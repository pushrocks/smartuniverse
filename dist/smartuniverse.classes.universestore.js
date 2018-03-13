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
        const messageObservable = smartrx_1.rxjs.Observable
            .from(this.messageStore.getArray())
            .filter(messageArg => {
            return messageArg.timestamp.isYoungerThanMilliSeconds(this.destructionTime);
        });
        return messageObservable;
    }
}
exports.UniverseStore = UniverseStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMudW5pdmVyc2VzdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG1HQUEwRTtBQUUxRSw2QkFBK0I7QUFHL0IscUNBQThCO0FBRTlCO0lBTUUsWUFBWSx3QkFBZ0M7UUFKckMsb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFDaEMsaUJBQVksR0FBRyxJQUFJLGVBQVMsRUFBbUIsQ0FBQztRQUMvQyxXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBRy9DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksdURBQWUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUF1QixDQUFDLFdBQW9CO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsY0FBSSxDQUFDLFVBQVU7YUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FBQztRQUNMLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUUzQixDQUFDO0NBQ0Y7QUEvQkQsc0NBK0JDIn0=