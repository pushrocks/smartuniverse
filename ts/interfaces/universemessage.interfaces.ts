export interface IMessageCreator {
  messageText: string;
  payload?: string | number | any;
  payloadStringType?: 'Buffer' | 'string' | 'object';
  targetChannelName: string;
}

export interface IUniverseMessage extends IMessageCreator {
  id: string;
  /**
   * time of creation
   */
  timestamp: number;
  passphrase: string;
}
