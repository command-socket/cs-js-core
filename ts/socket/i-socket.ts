/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:40 PM -- October 30th, 2019.
 *	Project: @command-socket/core
 */

import { AventNotifier } from "avents";

/**
 * An interface representing the general form of a socket so that per-environment implementations can be inserted.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface ISocket {

	send(data: any): void;
	
	close(code?: number, reason?: string): void;
	
	getIP(): Promise<string>;
	
	getEvents(): SocketEvents;

}

export class SocketEvents {
	
	public readonly OPEN: AventNotifier<{
		source: ISocket
	}>;
	
	public readonly MESSAGE: AventNotifier<{
		source: ISocket,
		data: any
	}>;
	
	public readonly CLOSE: AventNotifier<{
		source: ISocket,
		code: number,
		reason: string
	}>;
	
	public constructor() {
		
		this.OPEN = new AventNotifier();
		this.MESSAGE = new AventNotifier();
		this.CLOSE = new AventNotifier();
		
	}
	
}