import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { ClientUniverseChannel } from './smartuniverse.classes.clientuniversechannel';
import { ReactionResult } from './smartuniverse.classes.reactionresult';
export interface IReactionRequestConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    method: T['method'];
}
export interface ICombinatorPayload<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    /**
     * needed for tying responses to requests
     */
    id: string;
    typedRequestPayload: {
        method: T['method'];
        request: T['request'];
        response: T['response'];
    };
}
export declare class ReactionRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    method: T['method'];
    constructor(optionsArg: IReactionRequestConstructorOptions<T>);
    fire(channelsArg: Array<UniverseChannel | ClientUniverseChannel>, requestDataArg: T['request'], timeoutMillisArg?: number): Promise<ReactionResult<T>>;
}
