import { CommandSocketIdentity } from "../command-socket-identity";
export declare const CORRESPONDENCE_ID_LENGTH: number;
export interface CommandSocketMessage<P = any, R = any> {
    readonly command: string;
    readonly meta: {
        readonly request: CommandSocketIdentity;
        readonly response: CommandSocketIdentity | null;
        readonly timeline: {
            requestSent: number;
            requestReceived: number | null;
            responseSent: number | null;
            responseReceived: number | null;
        };
        readonly mode: "request" | "response";
        readonly correspondenceID: string;
        readonly didError: boolean;
    };
    readonly parameters: P | null;
    readonly return: R | CommandSocketSerializedError | null;
}
export interface CommandSocketSerializedError {
    readonly name: string;
    readonly message: string;
}
export interface CommandSocketRequestMessage<P = any, R = any> extends CommandSocketMessage<P, R> {
    readonly command: string;
    readonly meta: {
        readonly request: CommandSocketIdentity;
        readonly response: null;
        readonly timeline: {
            requestSent: number;
            requestReceived: number | null;
            responseSent: number | null;
            responseReceived: number | null;
        };
        readonly mode: "request";
        readonly correspondenceID: string;
        readonly didError: false;
    };
    readonly parameters: P;
    readonly return: null;
}
export interface CommandSocketResponseMessage<P = any, R = any> extends CommandSocketMessage<P, R> {
    readonly command: string;
    readonly meta: {
        readonly request: CommandSocketIdentity;
        readonly response: CommandSocketIdentity;
        readonly timeline: {
            requestSent: number;
            requestReceived: number;
            responseSent: number;
            responseReceived: number | null;
        };
        readonly mode: "response";
        readonly correspondenceID: string;
        readonly didError: boolean;
    };
    readonly parameters: P | null;
    readonly return: R | CommandSocketSerializedError;
}
