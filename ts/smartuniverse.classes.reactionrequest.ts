import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { ClientUniverseChannel } from './smartuniverse.classes.clientuniversechannel';
import { ReactionResult } from './smartuniverse.classes.reactionresult';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { ClientUniverseMessage } from './smartuniverse.classes.clientuniversemessage';

export interface IReactionRequestConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  method: T['method'];
}

export interface ICombinatorPayload<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  /**
   * needed for tying responses to requests
   */
  id: string;
  typedRequestPayload: {
    method: T['method'],
    request : T['request'],
    response: T['response']
  };
}

export class ReactionRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  public method: T['method'];

  constructor(optionsArg: IReactionRequestConstructorOptions<T>) {
    this.method = optionsArg.method;
  }

  public async fire(channelsArg: Array<UniverseChannel | ClientUniverseChannel>, requestDataArg: T['request'], timeoutMillisArg=5000) {
    const subscriptionMap = new plugins.lik.Objectmap<plugins.smartrx.rxjs.Subscription>();
    const reactionResult = new ReactionResult<T>();
    const requestId = plugins.smartunique.shortId();
    for (const channel of channelsArg) {
      subscriptionMap.add(channel.subscribe((messageArg: UniverseMessage<ICombinatorPayload<T>> | ClientUniverseMessage<ICombinatorPayload<T>>) => {
        if (messageArg.messageText === 'reactionResponse' && messageArg.payload.typedRequestPayload.method === this.method) {
          const payload: ICombinatorPayload<T> = messageArg.payload;
          if (payload.id !== requestId) {
            return;
          }
          reactionResult.pushReactionResponse(payload.typedRequestPayload.response);
        }
      }));
      const payload: ICombinatorPayload<T> = {
        id: requestId,
        typedRequestPayload: {
          method: this.method,
          request: requestDataArg,
          response: null
        }
      };
      channel.sendMessage({
        messageText: 'reactionRequest',
        payload
      });
    }
    plugins.smartdelay.delayFor(timeoutMillisArg).then(async () => {
      await subscriptionMap.forEach(subscriptionArg => {
        subscriptionArg.unsubscribe();
      });
      reactionResult.complete();
    });
    return reactionResult;
  }
}
