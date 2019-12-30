/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:51 PM -- September 18th, 2019.
 *	Project: @command-socket/core
 */

import { ObjectType } from "typit";
import * as IDUtilities from "../util/id-utilities";
import {
	CommandSetStructure,
	FullCommandSet,
	CommandIn,
	ParamTypeFor,
	ReturnTypeFor
} from "../schema/command-set-structure";
import { CommandRegistry } from "../command/command-registry";
import { MessageDefinition } from "../schema/typing/message-definition";
import {
	CommandSocketMessage,
	CommandSocketRequestMessage,
	CommandSocketResponseMessage
} from "../schema/message/command-socket-message";
import { CommandSocketMessageFactory } from "../schema/message/command-socket-message-factory";
import { CommandSocketIdentity } from "../schema/command-socket-identity";
import { BuiltinCommandSet } from "../builtin/builtin-command-set";
import { CommandSocketError } from "../error/command-socket-error";
import { CommandSocketCommandNotFoundError } from "../error/command-socket-command-not-found-error";
import { CommandSocketServerError } from "../error/command-socket-server-error";
import { CommandSocketMisplacedResponseError } from "../error/command-socket-misplaced-response-error";
import { ISocket } from "../socket/i-socket";
import { IdentifyCommand } from "../builtin/commands/identify-command";
import { PingCommand } from "../builtin/commands/ping-command";
import { CommandSocketEvents } from "./command-socket-events";
import { CommandSocketState } from "./command-socket-state";
import { TimedResponseCommand } from "../builtin/commands/debug/timed-response-command";
import { Command } from "../command/command";
import { CommandSocketUnrequitedRequestError } from "../error/command-socket-unrequited-request-error";

type ResponseCallback<T = any> = (response: CommandSocketResponseMessage, timeReceived: number) => void;

type OutstandingRequest<T = any> = {
	
	request: CommandSocketRequestMessage<any, T>,
	responseCallback: ResponseCallback<T>
	
};

/**
 * The underlying 'pure' connection between a client and server or vice-versa.
 *
 * Generic arguments:
 *   LCS - Local CommandSet
 *   RCS - Remote CommandSet
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export abstract class CommandSocket<
	LCS extends CommandSetStructure = any,
	RCS extends CommandSetStructure = any> {
	
	public static readonly ID_LENGTH: number = 10;
	
	private static readonly BUILTIN_COMMANDS: Array<Command<any, any>> = [
		new IdentifyCommand(),
		new PingCommand(),
		new TimedResponseCommand()
	];
	
	private socket: ISocket;
	
	private state: CommandSocketState;
	
	private id: string;
	
	private commandRegistry: CommandRegistry<FullCommandSet<LCS>>;
	
	private messageType: ObjectType;
	
	private outstandingRequests: Map<string, OutstandingRequest>;
	
	private events: CommandSocketEvents;
	
	public constructor(socket: ISocket,
					   commandRegistry: CommandRegistry<FullCommandSet<LCS>> = new CommandRegistry<FullCommandSet<LCS>>()) {
	
		this.id = IDUtilities.generateID(CommandSocket.ID_LENGTH);
		this.socket = socket;
		this.state = CommandSocketState.CONNECTING;
		this.commandRegistry = commandRegistry;
		this.messageType = new ObjectType(new MessageDefinition());
		this.outstandingRequests = new Map();
		this.events = new CommandSocketEvents();
		
		this.socket.getEvents().OPEN.subscribe((event: { source: ISocket }): void => {
			
			this.state = CommandSocketState.OPEN;
			
			this.getEvents().OPEN.notify({ source: this });
			
			// In-case a handshake is ever needed, perform it here.
			// this.invoke("commandsocket handshake");
			
		});
		
		this.socket.getEvents().MESSAGE.subscribe((event: { source: ISocket, data: any }): void => {
			
			this.handleMessage(event.data);
		
		});
		
		this.socket.getEvents().CLOSE.subscribe((event: { source: ISocket, code: number, reason: string }): void => {
			
			this.state = CommandSocketState.CLOSED;
			
			this.getEvents().CLOSE.notify({ ...event, source: this });
			
		});
		
		this.commandRegistry.addCommands(...CommandSocket.BUILTIN_COMMANDS);
		
		// TODO [10/20/19 @ 10:23 PM] - Implement 'error', 'ping', etc events.
	
	}
	
	public async rawRequest<C extends CommandIn<RCS> = CommandIn<RCS>>(command: C, params?: ParamTypeFor<RCS, C>): Promise<CommandSocketResponseMessage> {
		
		// TODO [11/26/19 @ 2:12 AM] - Add error when invoking on closed CommandSocket.
		
		return new Promise<CommandSocketResponseMessage>(
			async (resolve: (value?: (PromiseLike<CommandSocketResponseMessage> | CommandSocketResponseMessage)) => void,
				   reject: (reason?: any) => void): Promise<void> => {
				
				// TODO [11/27/19 @ 1:04 AM] - Respond with an actual error instead, whatever is used in a CommandSocketResponseMessage.
				if (!this.getState().isUsable()) reject("Cannot perform a request on a non-open CommandSocket.");
				
				let request: CommandSocketRequestMessage<ParamTypeFor<RCS, C>, ReturnTypeFor<RCS, C>> =
					await CommandSocketMessageFactory.createRequestMessage<ParamTypeFor<RCS, C>, ReturnTypeFor<RCS, C>>(
						command as string,
						(params === undefined ? null : params),
						this
					);
				
				this.outstandingRequests.set(
					request.meta.correspondenceID,
					{
						request,
						responseCallback: (response: CommandSocketResponseMessage, timeReceived: number): void => {
							
							response.meta.timeline.responseReceived = timeReceived;
							
							this.getEvents().REQUEST_FULFILLED.notify({
								source: this,
								request,
								response
							});
							
							this.outstandingRequests.delete(request.meta.correspondenceID);
							
							resolve(response);
							
						}
					});
				
				this.getEvents().OUTGOING_REQUEST.notify({ source: this, request });
				
				this.socket.send(JSON.stringify(request));
				
			}
		);
		
	}
	
	public async invoke<C extends CommandIn<RCS> = CommandIn<RCS>>(command: C, params?: ParamTypeFor<RCS, C>): Promise<ReturnTypeFor<RCS, C>> {
		
		// TODO [11/26/19 @ 2:12 AM] - Add error when invoking on closed CommandSocket.
	
		let response: CommandSocketResponseMessage = await this.rawRequest(command, params);
		
		if (response.meta.didError) throw response.return;
		else return response.return;
	
	}
	
	public async ping(): Promise<number> {
		
		let response: CommandSocketResponseMessage = await this.rawRequest("commandsocket ping", "Ping!");
		
		return ((response.meta.timeline.responseReceived as number) - response.meta.timeline.requestSent);
		
	}
	
	public async close(): Promise<void> {
	
		// TODO [10/29/19 @ 8:22 PM] - Respond to all outstanding requests with some form of an Error.
		
		let timestamp: number = Date.now();
		
		for (let outstandingRequest of this.outstandingRequests.values()) {
		
			let response: CommandSocketResponseMessage = await CommandSocketMessageFactory.createResponseMessage(
				outstandingRequest.request,
				new CommandSocketUnrequitedRequestError(),
				this,
				true,
				timestamp
			);
			
			// TODO [11/27/19 @ 1:18 AM] - We need to make an error that fits what's going on here for the above function call (2nd arg: CommandSocketError).
			
			outstandingRequest.responseCallback(response, timestamp);
		
		}
		
		this.outstandingRequests.clear();
		
		this.socket.close();
	
	}
	
	protected handleMessage(data: any): void {
		
		let timeReceived: number = Date.now();
		let jsonData: any;
		
		try {
			
			jsonData = JSON.parse(data);
			
			if (!this.messageType.checkConformity(jsonData)) {
				
				/* If a proper response can be formulated (if the data object has a correspondenceID) then reply with an
				 * error, then close.
				 * Otherwise, just close.
				 * Make sure to include a proper error code and 'reason' string.
				 */
				
				// TODO [10/29/19 @ 4:03 PM] - Finish the full MalformedMessageError class and throw an instance here.
				throw new Error("MalformedMessageError");
				
			}
			
			let message: CommandSocketMessage = jsonData;
			
			if (message.meta.mode === "request") this.handleRequest(message as CommandSocketRequestMessage, timeReceived);
			else this.handleResponse(message as CommandSocketResponseMessage, timeReceived);
			
		} catch (exception) {
			
			// Rethrow the error.
			throw new Error("MalformedMessageError");
			
		}
		
	}
	
	protected async handleRequest(request: CommandSocketRequestMessage, timeReceived: number): Promise<void> {
		
		let response: CommandSocketResponseMessage;
		
		this.getEvents().INCOMING_REQUEST.notify({ source: this, request });
		
		try {
			
			if (this.getCommandRegistry().hasCommand(request.command)) {
				
				let returnValue: any = await this.getCommandRegistry().execute(request.command, request.parameters, this);
				
				response = await CommandSocketMessageFactory.createResponseMessage(request, returnValue, this, false, timeReceived);
				
			} else response = await (new CommandSocketCommandNotFoundError(request.command)).toMessage(request, this);
			
		} catch (error) {
			
			if (error instanceof CommandSocketError) response = await error.toMessage(request, this);
			else response = await (new CommandSocketServerError()).toMessage(request, this);
			
		}
		
		this.getEvents().OUTGOING_RESPONSE.notify({ source: this, request, response });
		
		this.socket.send(JSON.stringify(response));
		
	}
	
	protected handleResponse(response: CommandSocketResponseMessage, timeReceived: number): void {
		
		if (this.outstandingRequests.has(response.meta.correspondenceID)) {
			
			// Get the outstanding request from the map.
			let outstandingRequest: OutstandingRequest =
				this.outstandingRequests.get(response.meta.correspondenceID) as OutstandingRequest;
			
			// Delete the outstanding request -- its no longer outstanding.
			this.outstandingRequests.delete(response.meta.correspondenceID);
			
			this.getEvents().INCOMING_RESPONSE.notify({
				source: this,
				request: outstandingRequest.request,
				response
			});
			
			outstandingRequest.responseCallback(response, timeReceived);
			
		} else {
			
			// We want to print out the error to the CommandSocket's stderr, but we don't want to interrupt execution.
			console.error(new CommandSocketMisplacedResponseError());
			
		}
		
	}
	
	public getID(): string {
	
		return this.id;
	
	}
	
	public getCommandRegistry(): CommandRegistry<LCS & BuiltinCommandSet> {
		
		return this.commandRegistry;
		
	}
	
	public async getSocketIdentity(): Promise<CommandSocketIdentity> {
		
		return {
			
			id: this.getID(),
			ip: await this.socket.getIP()
			
		};
		
	}
	
	public getState(): CommandSocketState {
		
		return this.state;
		
	}
	
	public getEvents(): CommandSocketEvents {
		
		return this.events;
		
	}
	
}