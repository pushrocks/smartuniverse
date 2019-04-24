export type IServerCallActions = 'subscribe' | 'sendmessage' | 'unsubscribe';

/**
 * the interface for a subscription
 */
export interface IServerCallSubscribeActionPayload {
  name: string;
  passphrase: string;
}