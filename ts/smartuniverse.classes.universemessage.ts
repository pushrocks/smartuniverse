import * as plugins from './smartuniverse.plugins';
import * as interfaces from './interfaces';
import { Universe } from './smartuniverse.classes.universe';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseCache } from './smartuniverse.classes.universecache';
import { SocketConnection } from '@pushrocks/smartsocket';
import { logger } from './smartuniverse.logging';

/**
 * represents a message within a universe
 * acts as a container to save message states like authentication status
 */
export class UniverseMessage<T> implements interfaces.IUniverseMessage {
  public static createMessageFromPayload(
    socketConnectionArg: SocketConnection,
    dataArg: interfaces.IUniverseMessage
  ) {
    const universeMessageInstance = new UniverseMessage(dataArg);
    universeMessageInstance.socketConnection = socketConnectionArg;
    return universeMessageInstance;
  }

  public id: string;
  public timestamp: number;
  public smartTimestamp: plugins.smarttime.TimeStamp;
  public messageText: string;
  public passphrase: string;
  public payload: T;
  public targetChannelName: string;
  public socketConnection: SocketConnection;

  /**
   * the UniverseCache the message is attached to
   */
  public universeCache: UniverseCache;

  /**
   * enables unprotected grouping of messages for efficiency purposes.
   */
  public universeChannelList = new plugins.lik.ObjectMap<UniverseChannel>();

  /**
   * wether the message is authenticated
   */
  public authenticated: boolean = false;

  /**
   * a destruction timer for this message
   */
  public destructionTimer: plugins.smarttime.Timer; // a timer to take care of message destruction

  /**
   * the constructor to create a universe message
   * @param messageArg
   * @param attachedPayloadArg
   */
  constructor(messageDescriptor: interfaces.IUniverseMessage) {
    this.smartTimestamp = new plugins.smarttime.TimeStamp(this.timestamp);
    this.messageText = messageDescriptor.messageText;
    this.targetChannelName = messageDescriptor.targetChannelName;
    this.passphrase = messageDescriptor.passphrase;
    this.payload = messageDescriptor.payload;
    // prevent memory issues
    this.setDestructionTimer();
  }

  public setUniverseCache(universeCacheArg: UniverseCache) {
    this.universeCache = universeCacheArg;
  }

  public setTargetChannel() {}

  public setDestructionTimer(selfdestructAfterArg?: number) {
    if (selfdestructAfterArg) {
      this.destructionTimer = new plugins.smarttime.Timer(selfdestructAfterArg);
      this.destructionTimer.start();
      // set up self destruction by removing this from the parent messageCache
      this.destructionTimer.completed
        .then(async () => {
          this.universeCache.messageMap.remove(this);
        })
        .catch((err) => {
          console.log(err);
          console.log(this);
        });
    } else {
      plugins.smartdelay.delayFor(1000).then(() => {
        if (!this.destructionTimer) {
          this.setDestructionTimer(6000);
        }
      });
    }
  }

  /**
   * handles bad messages for further analysis
   */
  public handleAsBadMessage() {
    logger.log('warn', 'received a bad message');
  }
}
