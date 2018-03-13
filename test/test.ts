// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from 'tapbundle';
import * as smartuniverse from '../ts/index';

let testUniverse: smartuniverse.Universe;
let testUniverseClient: smartuniverse.UniverseClient

tap.test('first test', async () => {
  testUniverse = new smartuniverse.Universe({
    messageExpiryInMilliseconds: 5000
  });
});

tap.test('add a message to the SmartUniverse', async () => {
  await testUniverse.initServer(8765);
})

// testing message handling
tap.test('create smartuniverse client', async () => {
  testUniverseClient = new smartuniverse.UniverseClient();
  expect(testUniverseClient).to.be.instanceof(smartuniverse.UniverseClient)
})

tap.test('should end the server correctly', async () => {
  await testUniverse.stopServer();
})

tap.start();
