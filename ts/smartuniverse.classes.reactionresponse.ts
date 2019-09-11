import * as plugins from './smartuniverse.plugins';

import { ICombinatorPayload } from './smartuniverse.classes.reactionrequest';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { ClientUniverseChannel } from './smartuniverse.classes.clientuniversechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { ClientUniverseMessage } from './smartuniverse.classes.clientuniversemessage';

export type TReactionResponseFuncDef<T extends plugins.typedrequestInterfaces.ITypedRequest> = (dataArg: T['request']) => Promise<T['response']>;

export interface IReactionResponseConstructorOptions<
  T extends plugins.typedrequestInterfaces.ITypedRequest
> {
  method: T['method'];
  channels: Array<UniverseChannel | ClientUniverseChannel>;
  funcDef: TReactionResponseFuncDef<T>;
}

export class ReactionResponse<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  public method: T['method'];
  public channels = new plugins.lik.Objectmap<UniverseChannel | ClientUniverseChannel>();
  public funcDef: TReactionResponseFuncDef<T>;

  constructor(optionsArg: IReactionResponseConstructorOptions<T>) {
    this.method = optionsArg.method;
    this.channels.addArray(optionsArg.channels);
    this.funcDef = optionsArg.funcDef;
    for (const channel of this.channels.getArray()) {
      channel.subscribe(messageArg => {
        this.processMessageForReaction(channel, messageArg);
      });
    }
  }

  private async processMessageForReaction(
    channelArg: UniverseChannel | ClientUniverseChannel,
    messageArg:
      | UniverseMessage<ICombinatorPayload<T>>
      | ClientUniverseMessage<ICombinatorPayload<T>>
  ) {
    if (
      messageArg.messageText === 'reactionRequest' &&
      messageArg.payload.typedRequestPayload.method === this.method
    ) {
      const response: T['response'] = await this.funcDef(messageArg.payload.typedRequestPayload.request);
      const payload: ICombinatorPayload<T> = {
        ...messageArg.payload,
        typedRequestPayload: {
          ...messageArg.payload.typedRequestPayload,
          response
        }
      };
      channelArg.sendMessage({
        messageText: 'reactionResponse',
        payload 
      });
    }
  }
}
