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
const smarttime_1 = require("smarttime");
class UniverseMessage {
    constructor(parentUniverseStore, messageArg, attachedPayloadArg, selfdestructAfterArg) {
        this.universeStore = parentUniverseStore;
        this.timestamp = new smarttime_1.TimeStamp();
        this.message = messageArg;
        this.attachedPayload = attachedPayloadArg;
        this.destructionTimer = new smarttime_1.Timer(selfdestructAfterArg);
        this.destructionTimer.start();
        // set up self destruction by removing this from the parent messageStore
        this.destructionTimer.completed.then(() => __awaiter(this, void 0, void 0, function* () {
            this.universeStore.messageStore.remove(this);
        }));
    }
}
exports.UniverseMessage = UniverseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0dW5pdmVyc2UuY2xhc3Nlcy51bml2ZXJzZW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHlDQUE2QztBQUc3QztJQWNFLFlBQVksbUJBQWtDLEVBQUUsVUFBa0IsRUFBRSxrQkFBdUIsRUFBRSxvQkFBNEI7UUFDdkgsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksaUJBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUU3Qix3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBM0JELDBDQTJCQyJ9