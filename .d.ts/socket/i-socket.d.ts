import { AventNotifier } from "avents";
export interface ISocket {
    send(data: any): void;
    close(code?: number, reason?: string): void;
    getIP(): Promise<string>;
    getEvents(): SocketEvents;
}
export declare class SocketEvents {
    readonly OPEN: AventNotifier<{
        source: ISocket;
    }>;
    readonly MESSAGE: AventNotifier<{
        source: ISocket;
        data: any;
    }>;
    readonly CLOSE: AventNotifier<{
        source: ISocket;
        code: number;
        reason: string;
    }>;
    constructor();
}
