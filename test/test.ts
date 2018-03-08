import { expect, tap } from 'tapbundle';
import * as smartuniverse from '../ts/index';

let testSmartUniverse: smartuniverse.SmartUniverse;

tap.test('first test', async () => {
  testSmartUniverse = new smartuniverse.SmartUniverse({
    port: 8765
  })
});

tap.start();
