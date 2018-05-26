import * as plugins from './smartuniverse.plugins';

import { Objectmap } from 'lik';


import { Timer, TimeStamp } from 'smarttime';
import { Universe } from './smartuniverse.classes.universe';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';

/**
 * represents a message within a universe
 * acts as a container to save message states like authentication status
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
   * the UniverseCache the message is attached to
   */
  public universeCache: UniverseCache;

  /**
   * requestedChannelName
   */
  public requestedChannelName: string;
  public requestedChannelPassphrase: string;

  /**
   * enables unprotected grouping of messages for efficiency purposes.
   */
  public universeChannelList = new Objectmap<UniverseChannel>();

  /**
   * wether the message is authenticated
   */
  public authenticated: boolean = null;

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
  constructor(
    messageArg: string,
    requestedChannelNameArg: string,
    passphraseArg: string,
    attachedPayloadArg: any
  ) {
    this.timestamp = new TimeStamp();
    this.message = messageArg;
    this.requestedChannelName = requestedChannelNameArg;
    this.requestedChannelPassphrase = passphraseArg;
    this.attachedPayload = attachedPayloadArg;
    // prevent memory issues
    this.fallBackDestruction();
  }

  public setUniverseCache(universeCacheArg: UniverseCache) {
    this.universeCache = universeCacheArg;
  }

  public setDestructionTimer(selfdestructAfterArg: number) {
    if (selfdestructAfterArg) {
      this.destructionTimer = new Timer(selfdestructAfterArg);
      this.destructionTimer.start();

      // set up self destruction by removing this from the parent messageCache
      this.destructionTimer.completed.then(async () => {
        this.universeCache.messageCache.remove(this);
      });
    } else {
      this.fallBackDestruction();
    }
  }

  /**
   * handles bad messages for further analysis
   */
  handleAsBadMessage() {
    console.log('received a bad message');
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
