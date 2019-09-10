export interface IMessageCreator {
  messageText: string;
  payload?: string | number | any;
}

/**
 * A universe
 */
export interface IUniverseMessage extends IMessageCreator {
  id: string;
  /**
   * time of creation
   */
  timestamp: number;
  passphrase: string;
  targetChannelName: string;
}
