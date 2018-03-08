"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartuniverse.plugins");
const index_1 = require("./index");
process.env.CLI = 'true';
const universeCli = new plugins.smartcli.Smartcli();
universeCli.standardTask().then(argvArg => {
    const standardUniverse = new index_1.SmartUniverse({
        port: 8765
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHVuaXZlcnNlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFtRDtBQUVuRCxtQ0FBd0M7QUFFeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0FBRXpCLE1BQU0sV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVwRCxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxxQkFBYSxDQUFDO1FBQ3pDLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==