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
const index_1 = require("./index");
process.env.CLI = 'true';
const universeCli = new plugins.smartcli.Smartcli();
universeCli.standardTask().then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    const standardUniverse = new index_1.Universe({
        messageExpiryInMilliseconds: 60000
    });
    yield standardUniverse.initServer(8765);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbURBQW1EO0FBRW5ELG1DQUFtQztBQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFFekIsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRXBELFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtJQUM5QyxNQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQVEsQ0FBQztRQUNwQywyQkFBMkIsRUFBRSxLQUFLO0tBQ25DLENBQUMsQ0FBQztJQUNILE1BQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==