import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "../schema/message/command-socket-message";
import { CommandSocket } from "../command-socket/command-socket";
import { CommandStructure } from "../schema/command/command-structure";
export declare class CommandSocketError extends Error {
    constructor(message: string, name?: string);
    toMessage<C extends CommandStructure>(request: CommandSocketRequestMessage<C>, context: CommandSocket): Promise<CommandSocketResponseMessage<C>>;
}
