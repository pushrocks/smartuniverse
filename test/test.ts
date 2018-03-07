import { expect, tap } from 'tapbundle';
import * as smartuniverse from '../ts/index';

tap.test('first test', async () => {
  console.log(smartuniverse.standardExport);
});

tap.start();
