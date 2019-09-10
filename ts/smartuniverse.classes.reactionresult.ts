import * as plugins from './smartuniverse.plugins';
import { ReactionResponse } from './smartuniverse.classes.reactionresponse';

export class ReactionResult<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  private resultSubject = new plugins.smartrx.rxjs.Subject<T['response']>();
  private endResult: Array<T['response']> = [];
  private completeDeferred = plugins.smartpromise.defer<Array<T['response']>>();

  constructor () {
    this.resultSubscribe(responseArg => {
      this.endResult.push(responseArg);
    });
  }

  public resultSubscribe(observerArg: (responseArg: T['response']) => void) {
    return this.resultSubject.subscribe(observerArg);
  }

  public async getEndResult() {
    const result = await this.completeDeferred.promise;
    return result;
  }

  /**
   * push a reactionResponse
   */
  public async pushReactionResponse(responseArg: T['response']) {
    this.resultSubject.next(responseArg);
  }
  
  /**
   * completes the ReactionResult
   */
  public async complete() {
    this.completeDeferred.resolve(this.endResult);
  }
}
