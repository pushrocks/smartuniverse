import * as plugins from './smartuniverse.plugins';

import { Timer, TimeStamp } from 'smarttime';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseStore } from './smartuniverse.classes.universestore';
import { Universe } from './smartuniverse.classes.universe';

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

  /**
   * the universe store the message is attached to
   */
  public universeStore: UniverseStore;
  /**
   * enables unprotected grouping of messages for efficiency purposes.
   */
  public universeChannel: UniverseChannel;

  /**
   * time of creation
   */
  public timestamp: TimeStamp;

  /**
   * the actual message
   */
  public message: string;

  /**
   * any attached payloads. Can be of binary format.
   */
  public attachedPayload: any;
  public destructionTimer: Timer; // a timer to take care of message destruction

  /**
   * the constructor to create a universe message
   * @param messageArg
   * @param attachedPayloadArg
   */
  constructor(messageArg: string, channelNameArg: string, passphraseArg: string,  attachedPayloadArg: any) {
    this.timestamp = new TimeStamp();
    this.message = messageArg;
    this.universeChannel = UniverseChannel.authorizeForChannel(channelNameArg, passphraseArg); 
    this.attachedPayload = attachedPayloadArg;
    this.fallBackDestruction();
  }

  public setUniverseStore(universeStoreArg: UniverseStore) {
    this.universeStore = universeStoreArg;
  }

  public setDestructionTimer(selfdestructAfterArg: number) {
    if (selfdestructAfterArg) {
      this.destructionTimer = new Timer(selfdestructAfterArg);
      this.destructionTimer.start();

      // set up self destruction by removing this from the parent messageStore
      this.destructionTimer.completed.then(async () => {
        this.universeStore.messageStore.remove(this);
      });
    } else {
      this.fallBackDestruction();
    }
  }

  /**
   * prevents memory leaks if channels have no default
   */
  private fallBackDestruction() {
    plugins.smartdelay.delayFor(1000).then(() => {
      if (!this.destructionTimer) {
        this.setDestructionTimer(6000);
      }
    });
  }
}
