// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from 'tapbundle';
import * as smartuniverse from '../ts/index';

import { Observable } from 'rxjs';

let testUniverse: smartuniverse.Universe;
let testUniverseClient: smartuniverse.UniverseClient;
let testMessageObservable: Observable<smartuniverse.UniverseMessage>;

tap.test('first test', async () => {
  testUniverse = new smartuniverse.Universe({
    messageExpiryInMilliseconds: 1000
  });
});

tap.test('add a message to the SmartUniverse', async () => {
  await testUniverse.initServer(8765);
});

// testing message handling
tap.test('create smartuniverse client', async () => {
  testUniverseClient = new smartuniverse.UniverseClient({
    serverAddress: 'http://localhost:8765'
  });
  expect(testUniverseClient).to.be.instanceof(smartuniverse.UniverseClient);
});

tap.test('should send a message correctly', async () => {
  await testUniverseClient.sendMessage('greeting', {
    anyBool: true
  });
});

tap.test('should get a obsevable correctly', async () => {
  testMessageObservable = testUniverseClient.getMessageObservable();
});

tap.test('should receive a message correctly', async () => {
 // TODO:
});

tap.test('should end the server correctly', async () => {
  await testUniverse.stopServer();
});

tap.start();
