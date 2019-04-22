export interface IServerGetMessagesRequestBody {
  channel: string;
  topic?: string;
  youngerThan: number;
}

/**
 * the interface for a standard request
 */
export interface IServerPutMessageRequestBody {
  channel: string;
  passphrase: string;
  message: string;
  payload: any;
}
