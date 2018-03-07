import * as plugins from './smartuniverse.plugins';

process.env.CLI = 'true';

const universeCli = new plugins.smartcli.Smartcli();

universeCli.standardTask().then(argvArg => {
  
});