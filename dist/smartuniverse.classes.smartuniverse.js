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
const paths = require("./smartuniverse.paths");
class SmartUniverse {
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
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.smartexpressServer = new plugins.smartexpress.Server({
                cors: true,
                defaultAnswer: `smartuniverse server ${this.universeVersion}`,
                forceSsl: false,
                port: this.options.port
            });
            const addRoute = new smartexpress_1.Route(this.smartexpressServer, 'addMessage');
            const addHandler = new smartexpress_1.Handler('PUT', requestBody => {
                return 'hi';
            });
            // await this.smartexpressServer.addRoute()
        });
    }
}
exports.SmartUniverse = SmartUniverse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLnNtYXJ0dW5pdmVyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsYXNzZXMuc21hcnR1bml2ZXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBRW5ELCtDQUFzRDtBQUV0RCwrQ0FBK0M7QUFNL0M7SUFHRSxJQUFZLGVBQWU7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVksVUFBNEM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDNUIsQ0FBQztJQUVZLElBQUk7O1lBQ2YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3hELElBQUksRUFBRSxJQUFJO2dCQUNWLGFBQWEsRUFBRSx3QkFBd0IsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDN0QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTthQUN4QixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sVUFBVSxHQUFHLElBQUksc0JBQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILDJDQUEyQztRQUM3QyxDQUFDO0tBQUE7Q0FDRjtBQS9CRCxzQ0ErQkMifQ==