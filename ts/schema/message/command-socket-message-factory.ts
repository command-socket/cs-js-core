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
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../command-structure";

/**
 * A factory/utility class for creating new {@link CommandSocketMessage}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketMessageFactory {
	
	public static async createRequestMessage<Command extends CommandStructure>(
		command: string,
		parameters: CommandStructureParameterType<Command>,
		requestingCommandSocket: CommandSocket,
		timeSent: number = Date.now()
		): Promise<CommandSocketRequestMessage<Command>> {
		
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
	
	public static async createResponseMessage<Command extends CommandStructure>(
		request: CommandSocketRequestMessage<Command>, returnValue: CommandStructureReturnType<Command>,
		respondingCommandSocket: CommandSocket, didError?: false, timestamp?: number):
		Promise<CommandSocketResponseMessage<Command>>;
	
	public static async createResponseMessage<Command extends CommandStructure>(
		request: CommandSocketRequestMessage<Command>, error: CommandSocketError, respondingCommandSocket: CommandSocket,
		didError?: true, timestamp?: number): Promise<CommandSocketResponseMessage<Command>>;
	
	public static async createResponseMessage<Command extends CommandStructure>(
		request: CommandSocketRequestMessage<Command>,
		returnValueOrError: CommandStructureReturnType<Command> | CommandSocketError,
		respondingCommandSocket: CommandSocket, didError: boolean = false, timeReceived: number = Date.now(),
		timeSent: number = Date.now()): Promise<CommandSocketResponseMessage<Command>> {
		
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