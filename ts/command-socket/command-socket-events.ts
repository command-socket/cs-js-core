/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:26 AM -- November 26th, 2019.
 *	Project: CommandSocket - Core
 */

import { AventNotifier } from "avents";
import { CommandSocketRequestMessage, CommandSocketResponseMessage } from "../schema/message/command-socket-message";
import { CommandSocket } from "./command-socket";

export class CommandSocketEvents {
	
	/**
	 * An event fired when the related CommandSocket initially opens.
	 */
	public readonly OPEN: AventNotifier<{
		source: CommandSocket
	}>;
	
	/**
	 * An event fired when the related CommandSocket places a request to some other CommandSocket.
	 */
	public readonly OUTGOING_REQUEST: AventNotifier<{
		source: CommandSocket,
		request: CommandSocketRequestMessage
	}>;
	
	/**
	 * An event fired when the related CommandSocket receives a response to a placed/outgoing request.
	 */
	public readonly INCOMING_RESPONSE: AventNotifier<{
		source: CommandSocket,
		request: CommandSocketRequestMessage,
		response: CommandSocketResponseMessage
	}>;
	
	/**
	 * An event fired when the related CommandSocket receives an incoming request from some other CommandSocket.
	 */
	public readonly INCOMING_REQUEST: AventNotifier<{
		source: CommandSocket,
		request: CommandSocketRequestMessage
	}>;
	
	/**
	 * An event fired when the related CommandSocket responds to some received request.
	 */
	public readonly OUTGOING_RESPONSE: AventNotifier<{
		source: CommandSocket,
		request: CommandSocketRequestMessage
		response: CommandSocketResponseMessage
	}>;
	
	public readonly REQUEST_FULFILLED: AventNotifier<{
		source: CommandSocket,
		request: CommandSocketRequestMessage
		response: CommandSocketResponseMessage
	}>;
	
	/**
	 * An event fired when the related CommandSocket closes.
	 */
	public readonly CLOSE: AventNotifier<{
		source: CommandSocket,
		code: number,
		reason: string
	}>;
	
	/**
	 * Initializes a new CommandSocketEvent object, readying the object's various {@link AventNotifier}s.
	 */
	public constructor() {
		
		this.OPEN = new AventNotifier();
		this.OUTGOING_REQUEST = new AventNotifier();
		this.INCOMING_RESPONSE = new AventNotifier();
		this.INCOMING_REQUEST = new AventNotifier();
		this.OUTGOING_RESPONSE = new AventNotifier();
		this.REQUEST_FULFILLED = new AventNotifier();
		this.CLOSE = new AventNotifier();
		
	}
	
}