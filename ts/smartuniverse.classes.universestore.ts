import * as plugins from './smartuniverse.plugins';

import { UniverseMessage } from './smartuniverse.classes.universemessage';

import { Objectmap } from 'lik';

import { Observable } from 'rxjs';
import { rxjs } from 'smartrx';

export class UniverseStore {
  public standardMessageExpiry: number;
  public destructionTime: number = 60000;
  public messageStore = new Objectmap<UniverseMessage>();
  private lastId: number = 0; // stores the last id

  constructor(standardMessageExpiryArg: number) {
    this.standardMessageExpiry = standardMessageExpiryArg;
  }

  /**
   * add a message to the UniverseStore
   * @param messageArg
   * @param attachedPayloadArg
   */
  public addMessage(messageArg, attachedPayloadArg) {
    this.messageStore.add(
      new UniverseMessage(this, messageArg, attachedPayloadArg, this.destructionTime)
    );
  }

  /**
   * Read a message from the UniverseStore
   */
  public readMessagesYoungerThan(unixTimeArg?: number): Observable<UniverseMessage> {
    const messageObservable = rxjs.Observable.from(this.messageStore.getArray()).filter(
      messageArg => {
        return messageArg.timestamp.isYoungerThanMilliSeconds(this.destructionTime);
      }
    );
    return messageObservable;
  }
}
