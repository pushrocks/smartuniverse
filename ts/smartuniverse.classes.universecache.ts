import * as plugins from './smartuniverse.plugins';

import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';

import { Objectmap } from '@pushrocks/lik';

import { Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { rxjs } from '@pushrocks/smartrx';
import { UniverseConnection } from './smartuniverse.classes.universeconnection';
import { Universe } from './smartuniverse.classes.universe';

/**
 * universe store handles the creation, storage and retrieval of messages.
 */
export class UniverseCache {
  // ========
  // INSTANCE
  // ========
  public standardMessageExpiry: number;
  public destructionTime: number = 60000;

  /**
   * stores messages for this instance
   */
  public messageMap = new Objectmap<UniverseMessage>();

  /**
   * stores the channels that are available within the universe
   */
  public channelMap = new Objectmap<UniverseChannel>();

  /**
   * stores all connections
   */
  public connectionMap = new plugins.lik.Objectmap<UniverseConnection>();

  /**
   * allows messages to be processed in a blacklist mode for further analysis
   */
  public blackListChannel: UniverseChannel;

  public universeRef: Universe;

  constructor(universeArg: Universe, standardMessageExpiryArg: number) {
    this.universeRef = universeArg;
    this.standardMessageExpiry = standardMessageExpiryArg;
    this.blackListChannel = new UniverseChannel(this.universeRef, 'blacklist', 'nada');
  }

  /**
   * add a message to the UniverseCache
   * @param messageArg
   * @param attachedPayloadArg
   */
  public async addMessage(messageArg: UniverseMessage) {
    messageArg.setUniverseCache(this);
    UniverseChannel.authorizeAMessageForAChannel(this, messageArg);
    this.messageMap.add(messageArg);
    messageArg.universeChannelList.forEach(universeChannel => {
      universeChannel.push(messageArg);
    });
  }

  /**
   * Read a message from the UniverseCache
   */
  public readMessagesYoungerThan(
    unixTimeArg?: number,
    channelName?: string
  ): Observable<UniverseMessage> {
    const messageObservable = from(this.messageMap.getArray()).pipe(
      filter(messageArg => {
        return messageArg.smartTimestamp.isYoungerThanMilliSeconds(this.destructionTime);
      })
    );
    return messageObservable;
  }
}
