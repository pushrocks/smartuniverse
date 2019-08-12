export type IServerCallActions =
  | 'channelSubscription'
  | 'processMessage'
  | 'channelUnsubscribe'
  | 'terminateConnection';

/**
 * the interface for a subscription
 */
export interface IServerCallSubscribeActionPayload {
  name: string;
  passphrase: string;
}

export interface IServerUnsubscribeActionPayload {
  name: string;
}
