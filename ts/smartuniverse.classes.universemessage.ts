import * as plugins from './smartuniverse.plugins';

import { Timer, TimeStamp } from 'smarttime';
import { UniverseStore } from './smartuniverse.classes.universestore';

/**
 * represents a message within a universe
 */
export class UniverseMessage {
  /**
   * public and unique id
   * numeric ascending
   * adheres to time in milliseconds
   * avoids duplications though
   */
  public id: number;
  public universeStore: UniverseStore;
  public timestamp: TimeStamp; // when has this message been created
  public topic: string; // enables unprotected grouping of messages for efficiency purposes.
  public message: string; // the actual message
  public attachedPayload: any; // any attached payloads. Can be of binary format.
  public destructionTimer: Timer; // a timer to take care of message destruction

  /**
   * the constructor to create a universe message
   * @param parentUniverseStore
   * @param messageArg 
   * @param attachedPayloadArg 
   * @param selfdestructAfterArg 
   */
  constructor(
    parentUniverseStore: UniverseStore,
    messageArg: string,
    attachedPayloadArg: any,
    selfdestructAfterArg: number
  ) {
    this.universeStore = parentUniverseStore;
    this.timestamp = new TimeStamp();
    this.message = messageArg;
    this.attachedPayload = attachedPayloadArg;
    this.destructionTimer = new Timer(selfdestructAfterArg);
    this.destructionTimer.start();

    // set up self destruction by removing this from the parent messageStore
    this.destructionTimer.completed.then(async () => {
      this.universeStore.messageStore.remove(this);
    });
  }
}
