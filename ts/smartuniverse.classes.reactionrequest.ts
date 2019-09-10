import * as plugins from './smartuniverse.plugins';

export interface IReactionRequestConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  method: T['method'];
}

export interface ICombinatorPayload<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  /**
   * needed for tying responses to requests
   */
  id: string;
  typedRequestPayload: T;

}

export class ReactionRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  public method: T['method'];

  constructor(optionsArg: IReactionRequestConstructorOptions<T>) {
    this.method = optionsArg.method;
  }

  public fireRequest(channelArg) {}
}
