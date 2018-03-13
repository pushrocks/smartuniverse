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
const smartexpress_1 = require("smartexpress");
const smartuniverse_classes_manager_1 = require("./smartuniverse.classes.manager");
const smartuniverse_classes_universestore_1 = require("./smartuniverse.classes.universestore");
const paths = require("./smartuniverse.paths");
class Universe {
    get universeVersion() {
        if (this.universeVersionStore) {
            return this.universeVersionStore;
        }
        else {
            const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
            this.universeVersionStore = packageJson.version;
            return this.universeVersionStore;
        }
    }
    constructor(optionsArg) {
        this.options = optionsArg;
        this.universeStore = new smartuniverse_classes_universestore_1.UniverseStore(this.options.messageExpiryInMilliseconds);
        this.universeManager = new smartuniverse_classes_manager_1.UniverseManager();
    }
    /**
     * initiates a server
     */
    initServer(portArg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.smartexpressServer = new plugins.smartexpress.Server({
                cors: true,
                defaultAnswer: `smartuniverse server ${this.universeVersion}`,
                forceSsl: false,
                port: portArg
            });
            // route handling
            const addMessageHandler = new smartexpress_1.Handler('PUT', request => {
                const requestBody = request.body;
                this.universeStore.addMessage(requestBody.message, requestBody.payload);
                return true;
            });
            const readMessageHandler = new smartexpress_1.Handler('GET', request => {
                const requestBody = request.body;
                this.universeStore.readMessagesYoungerThan(requestBody.since);
            });
            const messageRoute = new smartexpress_1.Route(this.smartexpressServer, 'message');
            messageRoute.addHandler(addMessageHandler);
            messageRoute.addHandler(readMessageHandler);
            yield this.smartexpressServer.start();
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.smartexpressServer.stop();
        });
    }
}
exports.Universe = Universe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnNtYXJ0dW5pdmVyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMuc21hcnR1bml2ZXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBRW5ELCtDQUFzRDtBQUV0RCxtRkFBa0U7QUFFbEUsK0ZBQXNFO0FBQ3RFLCtDQUErQztBQWUvQztJQVVFLElBQVksZUFBZTtRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBSUQsWUFBWSxVQUE0QztRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksbURBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLCtDQUFlLEVBQUUsQ0FBQztJQUUvQyxDQUFDO0lBRUQ7O09BRUc7SUFDVSxVQUFVLENBQUMsT0FBd0I7O1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUN4RCxJQUFJLEVBQUUsSUFBSTtnQkFDVixhQUFhLEVBQUUsd0JBQXdCLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzdELFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxPQUFPO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsaUJBQWlCO1lBQ2pCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxzQkFBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDckQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxzQkFBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDdEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUE7WUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLFlBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzQyxZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFNUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRVksVUFBVTs7WUFDckIsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsQ0FBQztLQUFBO0NBQ0Y7QUE3REQsNEJBNkRDIn0=