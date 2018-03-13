import * as plugins from './smartuniverse.plugins';

import { Timer, TimeStamp } from 'smarttime';
import { UniverseStore } from './smartuniverse.classes.universestore';

export class UniverseMessage {
  /**
   * public and unique id
   * numeric ascending
   * adheres to time in milliseconds
   * avoids duplications though
   */
  public id: number;
  public universeStore: UniverseStore;
  public timestamp: TimeStamp;
  public message: string;
  public attachedPayload: any;
  public destructionTimer: Timer;

  constructor(parentUniverseStore: UniverseStore, messageArg: string, attachedPayloadArg: any, selfdestructAfterArg: number) {
    this.universeStore = parentUniverseStore;
    this.timestamp = new TimeStamp();
    this.message = messageArg;
    this.attachedPayload = attachedPayloadArg;
    this.destructionTimer = new Timer(selfdestructAfterArg)
    this.destructionTimer.start()

    // set up self destruction by removing this from the parent messageStore
    this.destructionTimer.completed.then(async () => {
      this.universeStore.messageStore.remove(this);
    })
  }
}
