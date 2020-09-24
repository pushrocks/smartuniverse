import * as plugins from './smartuniverse.plugins';

/**
 * broadcasts an event to multiple channels
 * also handles subsription
 */
export class BroadcastEvent<T extends plugins.typedrequestInterfaces.ITypedEvent<any>> {
  public eventSubject = new plugins.smartrx.rxjs.Subject<T['payload']>();

  constructor() {

  };

  public fire(eventPayloadArg: T['payload']) {

  };


  public subscribe(funcArg: (nextArg: T['payload']) => void): plugins.smartrx.rxjs.Subscription {
    return this.eventSubject.subscribe(funcArg);
  }
}
