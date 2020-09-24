import * as plugins from './smartuniverse.plugins';
export declare class ReactionResult<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    private resultReplaySubject;
    private endResult;
    private completeDeferred;
    constructor();
    resultSubscribe(observerArg: (responseArg: T['response']) => void): plugins.smartrx.rxjs.Subscription;
    /**
     * gets the end result as an array of all results
     */
    getEndResult(): Promise<T["response"][]>;
    /**
     * if there is a single respondant, or you are only interested in the first result
     */
    getFirstResult(): Promise<T["response"]>;
    /**
     * push a reactionResponse
     */
    pushReactionResponse(responseArg: T['response']): Promise<void>;
    /**
     * completes the ReactionResult
     */
    complete(): Promise<void>;
}
