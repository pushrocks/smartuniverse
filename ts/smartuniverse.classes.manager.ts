import * as plugins from './smartuniverse.plugins';

import { Objectmap } from 'lik';
import { UniverseChannel } from './smartuniverse.classes.universechannel';

export class UniverseManager {
  public channelStore = new Objectmap<UniverseChannel>();

  /**
   * register a new member
   */
  public async registerMember() {}

  /**
   * register a new channel within the universe
   * @param channelName the name of the channel
   * @param authSecret the secret against which to verify members of the channel
   */
  public async registerChannel(channelName: string, authSecret: string) {
    
  }
}
