import * as plugins from './smartuniverse.plugins';
/**
 * broadcasts an event to multiple channels
 * also handles subsription
 */
export declare class BroadcastEvent<T extends plugins.typedrequestInterfaces.ITypedEvent<any>> {
    eventSubject: plugins.smartrx.rxjs.Subject<T["payload"]>;
    constructor();
    fire(eventPayloadArg: T['payload']): void;
    subscribe(funcArg: (nextArg: T['payload']) => void): plugins.smartrx.rxjs.Subscription;
}
