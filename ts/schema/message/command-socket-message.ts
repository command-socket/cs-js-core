/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:50 PM -- October 19th, 2019.
 *	Project: @command-socket/core
 */

import { CommandSocketIdentity } from "../command-socket-identity";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../command/command-structure";

export const CORRESPONDENCE_ID_LENGTH: number = 10;

/**
 * The schema of a message as received through the CommandSocket platform.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface CommandSocketMessage<Command extends CommandStructure = any> {

	readonly command: string;
	
	readonly meta: {
		
		readonly request: CommandSocketIdentity;
		
		readonly response: CommandSocketIdentity | null;
		
		readonly timeline: {
			
			requestSent: number;
			
			requestReceived: number | null;
			
			responseSent: number | null;
			
			responseReceived: number | null;
			
		}
		
		readonly mode: "request" | "response";
		
		readonly correspondenceID: string;
		
		readonly didError: boolean;
		
	};
	
	readonly parameters: CommandStructureParameterType<Command> | null;
	
	readonly return: CommandStructureReturnType<Command> | CommandSocketSerializedError | null;

}

export interface CommandSocketSerializedError {
	
	readonly name: string;
	
	readonly message: string;
	
}

export interface CommandSocketRequestMessage<Command extends CommandStructure = any> extends CommandSocketMessage<Command> {
	
	readonly command: string;
	
	readonly meta: {
		
		readonly request: CommandSocketIdentity;
		
		readonly response: null;
		
		readonly timeline: {
			
			requestSent: number;
			
			requestReceived: number | null;
			
			responseSent: number | null;
			
			responseReceived: number | null;
			
		}
		
		readonly mode: "request";
		
		readonly correspondenceID: string;
		
		readonly didError: false;
		
	};
	
	readonly parameters: CommandStructureParameterType<Command>;
	
	readonly return: null;
	
}

export interface CommandSocketResponseMessage<Command extends CommandStructure = any> extends CommandSocketMessage<Command> {
	
	readonly command: string;
	
	readonly meta: {
		
		readonly request: CommandSocketIdentity;
		
		readonly response: CommandSocketIdentity;
		
		readonly timeline: {
			
			requestSent: number;
			
			requestReceived: number;
			
			responseSent: number;
			
			responseReceived: number | null;
			
		}
		
		readonly mode: "response";
		
		readonly correspondenceID: string;
		
		readonly didError: boolean;
		
	};
	
	readonly parameters: CommandStructureParameterType<Command> | null;
	
	readonly return: CommandStructureReturnType<Command> | CommandSocketSerializedError;
	
}