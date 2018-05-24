import * as plugins from './smartuniverse.plugins';

import { Universe } from './index';

process.env.CLI = 'true';

const universeCli = new plugins.smartcli.Smartcli();

universeCli.standardTask().subscribe(async argvArg => {
  const standardUniverse = new Universe({
    messageExpiryInMilliseconds: 60000
  });
  await standardUniverse.initServer(8765);
});
