import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "../schema/message/command-socket-message";
import { CommandSocket } from "../command-socket/command-socket";
export declare class CommandSocketError extends Error {
    constructor(message: string, name?: string);
    toMessage<P = any, R = any>(request: CommandSocketRequestMessage<P, R>, context: CommandSocket<any, any>): Promise<CommandSocketResponseMessage<P, R>>;
}
