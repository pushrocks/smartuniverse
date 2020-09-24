import * as plugins from './smartuniverse.plugins';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { ClientUniverseChannel } from './smartuniverse.classes.clientuniversechannel';
export declare type TReactionResponseFuncDef<T extends plugins.typedrequestInterfaces.ITypedRequest> = (dataArg: T['request']) => Promise<T['response']>;
export interface IReactionResponseConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    method: T['method'];
    channels: Array<UniverseChannel | ClientUniverseChannel>;
    funcDef: TReactionResponseFuncDef<T>;
}
export declare class ReactionResponse<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    method: T['method'];
    channels: plugins.lik.ObjectMap<UniverseChannel | ClientUniverseChannel>;
    funcDef: TReactionResponseFuncDef<T>;
    constructor(optionsArg: IReactionResponseConstructorOptions<T>);
    private processMessageForReaction;
}
