export interface IUniverseMessage {
  messageText: string;
  targetChannelName: string;
  passphrase: string;
  payload?: string | number | any;
  payloadStringType?: 'Buffer' | 'string' | 'object';
}
