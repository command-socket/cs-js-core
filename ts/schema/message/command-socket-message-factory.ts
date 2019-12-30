/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:04 PM -- October 29th, 2019.
 *	Project: @command-socket/core
 */

import {
	CommandSocketRequestMessage,
	CommandSocketResponseMessage,
	CORRESPONDENCE_ID_LENGTH
} from "./command-socket-message";
import { CommandSocketIdentity } from "../command-socket-identity";
import * as IDUtilities from "../../util/id-utilities";
import { CommandSocketError } from "../../error/command-socket-error";
import { CommandSocket } from "../../command-socket/command-socket";

/**
 * A factory/utility class for creating new {@link CommandSocketMessage}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketMessageFactory {
	
	public static async createRequestMessage<P = any, R = any>(
		command: string,
		parameters: P,
		requestingCommandSocket: CommandSocket<any, any>,
		timeSent: number = Date.now()
		): Promise<CommandSocketRequestMessage<P, R>> {
		
		let { id, ip }: CommandSocketIdentity = await requestingCommandSocket.getSocketIdentity();
		
		return {
			
			command,
			
			meta: {
				
				request: { id, ip },
				
				response: null,
				
				timeline: {
					
					requestSent: timeSent,
					
					requestReceived: null,
					
					responseSent: null,
					
					responseReceived: null
					
				},
				
				mode: "request",
				
				correspondenceID: IDUtilities.generateID(CORRESPONDENCE_ID_LENGTH),
				
				didError: false
				
			},
			
			parameters,
			
			return: null
			
		};
		
	}
	
	public static async createResponseMessage<P = any, R = any>(
		request: CommandSocketRequestMessage<P, R>, returnValue: R, respondingCommandSocket: CommandSocket<any, any>,
		didError?: false, timestamp?: number): Promise<CommandSocketResponseMessage<P, R>>;
	public static async createResponseMessage<P = any, R = any>(
		request: CommandSocketRequestMessage<P, R>, error: CommandSocketError, respondingCommandSocket: CommandSocket,
		didError?: true, timestamp?: number): Promise<CommandSocketResponseMessage<P, R>>;
	public static async createResponseMessage<P = any, R = any>(
		request: CommandSocketRequestMessage<P, R>, returnValueOrError: R | CommandSocketError,
		respondingCommandSocket: CommandSocket, didError: boolean = false,
		timeReceived: number = Date.now(), timeSent: number = Date.now()): Promise<CommandSocketResponseMessage<P, R>> {
		
		let { id, ip }: CommandSocketIdentity = await respondingCommandSocket.getSocketIdentity();
		
		let returnValue: any;
		
		if (didError) {
			
			let error: CommandSocketError = returnValueOrError as CommandSocketError;
			
			returnValue = {
				
				name: error.name,
				message: error.message
				
			};
			
		} else returnValue = returnValueOrError;
		
		return {
			
			command: request.command,
			
			meta: {
				
				request: request.meta.request,
				
				response: { id, ip },
				
				timeline: {
					
					requestSent: request.meta.timeline.requestSent,
					
					requestReceived: timeReceived,
					
					responseSent: timeSent,
					
					responseReceived: null
					
				},
				
				mode: "response",
				
				correspondenceID: request.meta.correspondenceID,
				
				didError
				
			},
			
			parameters: request.parameters,
			
			return: returnValue
			
		};
		
	}
	
}