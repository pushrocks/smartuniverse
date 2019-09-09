import * as interfaces from './index';

export interface ISocketRequest_SubscribeChannel {
  method: 'subscribeChannel';
  request: {
    name: string;
    passphrase: string;
  };
  response: {
    subscriptionStatus: 'subscribed' | 'unsubscribed'
  };
}

export interface ISocketRequest_ProcessMessage {
  method: 'processMessage';
  request: interfaces.IUniverseMessage;
  response: {
    messageStatus: 'ok'
  };
}