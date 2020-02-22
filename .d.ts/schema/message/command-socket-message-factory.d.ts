import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "./command-socket-message";
import { CommandSocketError } from "../../error/command-socket-error";
import { CommandSocket } from "../../command-socket/command-socket";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../command-structure";
export declare class CommandSocketMessageFactory {
    static createRequestMessage<Command extends CommandStructure>(command: string, parameters: CommandStructureParameterType<Command>, requestingCommandSocket: CommandSocket, timeSent?: number): Promise<CommandSocketRequestMessage<Command>>;
    static createResponseMessage<Command extends CommandStructure>(request: CommandSocketRequestMessage<Command>, returnValue: CommandStructureReturnType<Command>, respondingCommandSocket: CommandSocket, didError?: false, timestamp?: number): Promise<CommandSocketResponseMessage<Command>>;
    static createResponseMessage<Command extends CommandStructure>(request: CommandSocketRequestMessage<Command>, error: CommandSocketError, respondingCommandSocket: CommandSocket, didError?: true, timestamp?: number): Promise<CommandSocketResponseMessage<Command>>;
}
