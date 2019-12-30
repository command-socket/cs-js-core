import { AventNotifier } from "avents";
import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "../schema/message/command-socket-message";
import { CommandSocket } from "./command-socket";
export declare class CommandSocketEvents {
    readonly OPEN: AventNotifier<{
        source: CommandSocket;
    }>;
    readonly OUTGOING_REQUEST: AventNotifier<{
        source: CommandSocket;
        request: CommandSocketRequestMessage;
    }>;
    readonly INCOMING_RESPONSE: AventNotifier<{
        source: CommandSocket;
        request: CommandSocketRequestMessage;
        response: CommandSocketResponseMessage;
    }>;
    readonly INCOMING_REQUEST: AventNotifier<{
        source: CommandSocket;
        request: CommandSocketRequestMessage;
    }>;
    readonly OUTGOING_RESPONSE: AventNotifier<{
        source: CommandSocket;
        request: CommandSocketRequestMessage;
        response: CommandSocketResponseMessage;
    }>;
    readonly REQUEST_FULFILLED: AventNotifier<{
        source: CommandSocket;
        request: CommandSocketRequestMessage;
        response: CommandSocketResponseMessage;
    }>;
    readonly CLOSE: AventNotifier<{
        source: CommandSocket;
        code: number;
        reason: string;
    }>;
    constructor();
}
