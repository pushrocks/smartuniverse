// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from '@pushrocks/tapbundle';
import * as smartuniverse from '../ts/index';

import { Observable } from 'rxjs';

let testUniverse: smartuniverse.Universe;
let testClientUniverse: smartuniverse.ClientUniverse;
let testClientUniverse2: smartuniverse.ClientUniverse;
let testClientChannel: smartuniverse.ClientUniverseChannel;

const testServerData = {
  serverAddress: 'http://localhost:8765'
};

const testChannelData = {
  channelName: 'awesomeTestChannel',
  channelPass: 'awesomeChannelPass'
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
    serverAddress: testServerData.serverAddress
  });
  expect(testClientUniverse).to.be.instanceof(smartuniverse.ClientUniverse);
});

tap.test('should add a channel to the universe', async () => {
  testUniverse.addChannel(testChannelData.channelName, testChannelData.channelPass);
});

tap.test('should add the same channel to the client universe in the same way', async () => {
  testClientUniverse.addChannel(testChannelData.channelName, testChannelData.channelPass);
});

tap.test('should start the ClientUniverse', async () => {
  await testClientUniverse.start();
});

tap.test('should get a observable correctly', async () => {
  testClientChannel = testClientUniverse.getChannel(testChannelData.channelName);
  expect(testClientChannel).to.be.instanceof(smartuniverse.ClientUniverseChannel);
});

tap.test('should send a message correctly', async () => {
  await testClientUniverse.getChannel(testChannelData.channelName).sendMessage({
    messageText: 'hello'
  });
});

tap.test('universe should contain the sent message', async () => {
  expect(testUniverse.universeCache.messageMap.getArray()[0].messageText).to.equal('hello');
});

tap.test('a second client should be able to subscibe', async () => {
  testClientUniverse2 = new smartuniverse.ClientUniverse({
    serverAddress: testServerData.serverAddress
  });

  testClientUniverse2.addChannel(testChannelData.channelName, testChannelData.channelPass);
  await testClientUniverse2.start();
});

tap.test('should receive a message correctly', async (tools) => {
  const done = tools.defer();
  const testChannel = testClientUniverse.getChannel(testChannelData.channelName);
  const testChannel2 = testClientUniverse2.getChannel(testChannelData.channelName);
  const subscription = await testChannel2.subscribe(messageArg => {
    console.log('Yay##########');
    done.resolve();
  });
  await testChannel.sendMessage({
    messageText: 'hellothere'
  });
  await done.promise;
});

tap.test('should disconnect the client correctly', async () => {
  await testClientUniverse.stop();
});

tap.test('should end the server correctly', async tools => {
  await testUniverse.stopServer();
});

tap.start();
