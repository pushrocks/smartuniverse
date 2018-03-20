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
            this.smartsocket = new plugins.smartsocket.Smartsocket({
                port: 12345 // fix this within smartsocket
            });
            this.smartsocket.setServer(this.smartexpressServer); // should work with express as well
            this.smartsocket.startServer();
            // route handling
            // adds messages
            const addMessageHandler = new smartexpress_1.Handler('PUT', request => {
                const requestBody = request.body;
                this.universeStore.addMessage(requestBody.message, requestBody.payload);
                console.log(requestBody);
                return true;
            });
            // gets messages
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLnVuaXZlcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtREFBbUQ7QUFFbkQsK0NBQXNEO0FBRXRELG1GQUFrRTtBQUVsRSwrRkFBc0U7QUFDdEUsK0NBQStDO0FBZS9DO0lBVUUsSUFBWSxlQUFlO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDbkMsQ0FBQztJQUNILENBQUM7SUFLRCxZQUFZLFVBQTRDO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxtREFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksK0NBQWUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNVLFVBQVUsQ0FBQyxPQUF3Qjs7WUFDOUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3hELElBQUksRUFBRSxJQUFJO2dCQUNWLGFBQWEsRUFBRSx3QkFBd0IsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDN0QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBQ3JELElBQUksRUFBRSxLQUFLLENBQUMsOEJBQThCO2FBQzNDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBeUIsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1lBQy9GLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFL0IsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixNQUFNLGlCQUFpQixHQUFHLElBQUksc0JBQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFFSCxnQkFBZ0I7WUFDaEIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHNCQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUN0RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLFlBQVksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUU1QyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNyQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQUE7Q0FDRjtBQXhFRCw0QkF3RUMifQ==