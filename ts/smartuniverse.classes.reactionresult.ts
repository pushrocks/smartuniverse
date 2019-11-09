import * as plugins from './smartuniverse.plugins';
import { ReactionResponse } from './smartuniverse.classes.reactionresponse';

export class ReactionResult<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  private resultReplaySubject = new plugins.smartrx.rxjs.ReplaySubject<T['response']>();
  private endResult: Array<T['response']> = [];
  private completeDeferred = plugins.smartpromise.defer<Array<T['response']>>();

  constructor() {
    this.resultSubscribe(responseArg => {
      this.endResult.push(responseArg);
    });
  }

  public resultSubscribe(observerArg: (responseArg: T['response']) => void) {
    return this.resultReplaySubject.subscribe(observerArg);
  }

  /**
   * gets the end result as an array of all results
   */
  public async getEndResult() {
    const result = await this.completeDeferred.promise;
    return result;
  }

  /**
   * if there is a single respondant, or you are only interested in the first result
   */
  public async getFirstResult() {
    const done = plugins.smartpromise.defer<T['response']>();
    const subscription = this.resultReplaySubject.subscribe(result => {
      done.resolve(result);
      subscription.unsubscribe();
    });
    return await done.promise;
  }

  /**
   * push a reactionResponse
   */
  public async pushReactionResponse(responseArg: T['response']) {
    this.resultReplaySubject.next(responseArg);
  }

  /**
   * completes the ReactionResult
   */
  public async complete() {
    this.completeDeferred.resolve(this.endResult);
  }
}
