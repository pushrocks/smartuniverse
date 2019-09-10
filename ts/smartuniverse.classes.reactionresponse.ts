import * as plugins from './smartuniverse.plugins';

import { ICombinatorPayload } from './smartuniverse.classes.reactionrequest';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { ClientUniverseChannel } from './smartuniverse.classes.clientuniversechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { ClientUniverseMessage } from './smartuniverse.classes.clientuniversemessage';

export interface IReactionResponseConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  method: T['method'];
  channels: Array<UniverseChannel | ClientUniverseChannel>;
}


export class ReactionResponse<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  public method: T['method'];
  public channels = new plugins.lik.Objectmap<UniverseChannel | ClientUniverseChannel>();

  constructor(optionsArg: IReactionResponseConstructorOptions<T>) {
    this.channels.addArray(optionsArg.channels);
    for (const channel of this.channels.getArray()) {
      channel.subscribe(messageArg => {
        this.processMessageForReaction(messageArg);
      });
    }
  }

  private processMessageForReaction(messageArg: UniverseMessage<ICombinatorPayload<T>> | ClientUniverseMessage<ICombinatorPayload<T>>) {

  }
}
