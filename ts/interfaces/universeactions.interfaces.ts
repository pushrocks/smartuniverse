export type IServerCallActions =
  | 'channelSubscription'
  | 'processMessage'
  | 'channelUnsubscribe'
  | 'terminateConnection';

export interface IServerUnsubscribeActionPayload {
  name: string;
}
