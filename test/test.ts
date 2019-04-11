// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
import * as smartuniverse from '../ts/index';

import { Observable } from 'rxjs';

let testUniverse: smartuniverse.Universe;
let testUniverseClient: smartuniverse.ClientUniverse;
let testClientChannel: smartuniverse.ClientUniverseChannel;

const testChannelData = {
  channelName: 'awesomeTestChannel',
  channelPass: 'awesomeChannelPAss'
}

tap.test('first test', async () => {
  testUniverse = new smartuniverse.Universe({
    messageExpiryInMilliseconds: 1000
  });
});

tap.test('add a message to the SmartUniverse', async () => {
  await testUniverse.start(8765);
});

// testing message handling
tap.test('create smartuniverse client', async () => {
  testUniverseClient = new smartuniverse.ClientUniverse({
    serverAddress: 'http://localhost:8765'
  });
  expect(testUniverseClient).to.be.instanceof(smartuniverse.ClientUniverse);
});

tap.test('should add a channel to the universe', async () => {
  await testUniverse.addChannel('testChannel', 'testPassword');
});

tap.test('should get a observable correctly', async () => {
  testClientChannel = await testUniverseClient.getChannel(testChannelData.channelName, testChannelData.channelPass);
  expect(testClientChannel).to.be.instanceof(smartuniverse.ClientUniverseChannel);
});

tap.test('should send a message correctly', async () => {
  await testUniverseClient.sendMessage('greeting', {
    anyBool: true
  });
});

tap.test('should receive a message correctly', async () => {});

tap.test('should disconnect the client correctly', async () => {
  testUniverseClient.close();
});

tap.test('should end the server correctly', async tools => {
  await testUniverse.stopServer();
});

tap.start();
