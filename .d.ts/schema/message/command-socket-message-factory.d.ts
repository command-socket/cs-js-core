import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "./command-socket-message";
import { CommandSocketError } from "../../error/command-socket-error";
import { CommandSocket } from "../../command-socket/command-socket";
export declare class CommandSocketMessageFactory {
    static createRequestMessage<P = any, R = any>(command: string, parameters: P, requestingCommandSocket: CommandSocket<any, any>, timeSent?: number): Promise<CommandSocketRequestMessage<P, R>>;
    static createResponseMessage<P = any, R = any>(request: CommandSocketRequestMessage<P, R>, returnValue: R, respondingCommandSocket: CommandSocket<any, any>, didError?: false, timestamp?: number): Promise<CommandSocketResponseMessage<P, R>>;
    static createResponseMessage<P = any, R = any>(request: CommandSocketRequestMessage<P, R>, error: CommandSocketError, respondingCommandSocket: CommandSocket, didError?: true, timestamp?: number): Promise<CommandSocketResponseMessage<P, R>>;
}
