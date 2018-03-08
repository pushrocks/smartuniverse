import * as plugins from './smartuniverse.plugins';

import { SmartUniverse } from './index';

process.env.CLI = 'true';

const universeCli = new plugins.smartcli.Smartcli();

universeCli.standardTask().then(argvArg => {
  const standardUniverse = new SmartUniverse({
    port: 8765
  });
});
