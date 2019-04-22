// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
import * as smartuniverse from '../ts/index';

import { Observable } from 'rxjs';

let testUniverse: smartuniverse.Universe;
let testClientUniverse: smartuniverse.ClientUniverse;
let testClientChannel: smartuniverse.ClientUniverseChannel;

const testChannelData = {
  channelName: 'awesomeTestChannel',
  channelPass: 'awesomeChannelPAss'
};

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
  testClientUniverse = new smartuniverse.ClientUniverse({
    serverAddress: 'http://localhost:8765'
  });
  expect(testClientUniverse).to.be.instanceof(smartuniverse.ClientUniverse);
});

tap.test('should add a channel to the universe', async () => {
  await testUniverse.addChannel(testChannelData.channelName, testChannelData.channelPass);
});

tap.test('should add the same channel to the client universe in the same way', async () => {
  await testClientUniverse.addChannel(testChannelData.channelName, testChannelData.channelPass);
});

tap.test('should get a observable correctly', async () => {
  testClientChannel = await testClientUniverse.getChannel(testChannelData.channelName);
  expect(testClientChannel).to.be.instanceof(smartuniverse.ClientUniverseChannel);
});

tap.test('should send a message correctly', async () => {
  await testClientUniverse.sendMessage({
    messageText: 'hello',
    targetChannelName: testChannelData.channelName
  });
});

tap.test('should receive a message correctly', async () => {});

tap.test('should disconnect the client correctly', async () => {
  testClientUniverse.close();
});

tap.test('should end the server correctly', async tools => {
  await testUniverse.stopServer();
});

tap.start();
