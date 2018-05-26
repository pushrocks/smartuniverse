import * as plugins from './smartuniverse.plugins';

import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';

import { Objectmap } from 'lik';

import { Observable } from 'rxjs';
import { rxjs } from 'smartrx';

/**
 * universe store handles the creation, storage and retrieval of messages.
 */
export class UniverseCache {
  public standardMessageExpiry: number;
  public destructionTime: number = 60000;

  /**
   * stores messages for this instance
   */
  public messageCache = new Objectmap<UniverseMessage>();

  /**
   * stores the channels that are available within the universe
   */
  public channelCache = new Objectmap<UniverseChannel>();

  /**
   * allows messages to be processed in a blacklist mode for further analysis
   */
  public blackListChannel = new UniverseChannel(this, 'blacklist', 'nada');

  private lastId: number = 0; // stores the last id

  constructor(standardMessageExpiryArg: number) {
    this.standardMessageExpiry = standardMessageExpiryArg;
  }

  /**
   * add a message to the UniverseStore
   * @param messageArg
   * @param attachedPayloadArg
   */
  public async addMessage(messageArg: UniverseMessage) {
    messageArg.setUniverseCache(this);
    UniverseChannel.authorizeAMessageForAChannel(this, messageArg);
    this.messageCache.add(messageArg);
  }

  /**
   * Read a message from the UniverseStore
   */
  public readMessagesYoungerThan(unixTimeArg?: number): Observable<UniverseMessage> {
    const messageObservable = rxjs.Observable.from(this.messageCache.getArray()).filter(
      messageArg => {
        return messageArg.timestamp.isYoungerThanMilliSeconds(this.destructionTime);
      }
    );
    return messageObservable;
  }
}
