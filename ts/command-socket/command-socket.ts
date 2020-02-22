/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:51 PM -- September 18th, 2019.
 *	Project: @command-socket/core
 */

import { ObjectType } from "typit";
import * as IDUtilities from "../util/id-utilities";
import { CommandStructureInCommandSet, CommandNameInCommandSet, CommandSetStructure } from "../schema/command/command-set-structure";
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
import { FormalCommand } from "../schema/command/formal-command";
import { CommandSocketUnrequitedRequestError } from "../error/command-socket-unrequited-request-error";
import { CommandStructureParameterType, CommandStructureReturnType } from "../schema/command/command-structure";

type ResponseCallback<T = any> = (response: CommandSocketResponseMessage, timeReceived: number) => void;

type OutstandingRequest<T = any> = {
	
	request: CommandSocketRequestMessage,
	responseCallback: ResponseCallback<T>
	
};

export type FullCommandSet<CS extends CommandSetStructure> = CS & BuiltinCommandSet;

type ParameterOf<CS extends CommandSetStructure, CN extends CommandNameInCommandSet<CS> =
	CommandNameInCommandSet<CS>> =
	CommandStructureParameterType<CommandStructureInCommandSet<CS, CN>>;

type ReturnTypeOf<CS extends CommandSetStructure, CN extends CommandNameInCommandSet<CS> =
	CommandNameInCommandSet<CS>> =
	CommandStructureReturnType<CommandStructureInCommandSet<CS, CN>>;

/**
 * The underlying 'pure' connection between a client and server or vice-versa.
 *
 * Generic arguments:
 *   LCS - Local CommandSetStructure
 *   RCS - Remote CommandSetStructure
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 * @param LCS The local command set - must implement {@link CommandSetStructure}.
 */
export abstract class CommandSocket<
	LCS extends CommandSetStructure = any,
	RCS extends CommandSetStructure = any,
	M extends {} = {}> {
	
	/**
	 * The length of the ID generated for each new CommandSocket.
	 */
	public static readonly ID_LENGTH: number = 10;
	
	/**
	 * An array of {@link Command}s that come built-in with each CommandSocket.
	 */
	private static readonly BUILTIN_COMMANDS: { [commandName: string]: FormalCommand<any> } = {
		"commandsocket identify": new IdentifyCommand(),
		"commandsocket ping": new PingCommand(),
		"commandsocket debug timed-response": new TimedResponseCommand()
	};
	
	/**
	 * The internal ISocket-conforming instance used internally to communicate with other CommandSockets.
	 */
	private socket: ISocket;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private state: CommandSocketState;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private id: string;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private commandRegistry: CommandRegistry<FullCommandSet<LCS>>;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private messageType: ObjectType;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private outstandingRequests: Map<string, OutstandingRequest>;
	
	// DOC-ME [2/21/20 @ 4:36 PM] - Documentation required!
	private events: CommandSocketEvents;
	
	private metadata: Partial<M>;
	
	public constructor(socket: ISocket, commandRegistry: CommandRegistry<LCS> = new CommandRegistry<LCS>(), metadata: Partial<M> = {}) {
	
		this.id = IDUtilities.generateID(CommandSocket.ID_LENGTH);
		this.socket = socket;
		this.state = CommandSocketState.CONNECTING;
		this.commandRegistry = commandRegistry as unknown as CommandRegistry<FullCommandSet<LCS>>;
		this.messageType = new ObjectType(new MessageDefinition());
		this.outstandingRequests = new Map();
		this.events = new CommandSocketEvents();
		this.metadata = metadata;
		
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
		
		for (let commandName in CommandSocket.BUILTIN_COMMANDS) {
			
			this.getCommandRegistry().addCommand(commandName as any, CommandSocket.BUILTIN_COMMANDS[commandName]);
			
		}
		
		// TODO [10/20/19 @ 10:23 PM] - Implement 'error', 'ping', etc events.
	
	}
	
	/**
	 * Asynchronously executes a command on the remote CommandSocket, returning a Promise that resolves to the entire
	 * JSON message ({@link CommandSocketResponseMessage}) returned from said CommandSocket.
	 *
	 * @param command The string Command identifier of the Command to be executed.
	 * @param params The parameter(s) to pass to the Command to be executed.
	 * @return A Promise that resolves to the entire JSON message (CommandSocketResponseMessage) returned from the
	 * remote CommandSocket.
	 * @see CommandSocket#invoke
	 */
	public async rawRequest<CommandName extends CommandNameInCommandSet<FullCommandSet<RCS>>>(
		command: CommandName,
		params: ParameterOf<FullCommandSet<RCS>, CommandName>):
		Promise<CommandSocketResponseMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>>> {
		
		type CommandSocketResponse = CommandSocketResponseMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>>;
		type RawRequestPromiseResolveType = PromiseLike<CommandSocketResponse> | CommandSocketResponse;
		
		// TODO [11/26/19 @ 2:12 AM] - Add error when invoking on closed CommandSocket.
		
		return new Promise<CommandSocketResponse>(async (resolve: (value?: RawRequestPromiseResolveType) => void, reject: (reason?: any) => void): Promise<void> => {
				
				// TODO [11/27/19 @ 1:04 AM] - Respond with an actual error instead, whatever is used in a CommandSocketResponseMessage.
				if (!this.getState().isUsable()) reject("Cannot perform a request on a non-open CommandSocket.");
				
				let request: CommandSocketRequestMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>> =
					await CommandSocketMessageFactory.createRequestMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>>(
						command as string,
						params,
						this
					);
				
				this.outstandingRequests.set(
					request.meta.correspondenceID,
					{
						request,
						responseCallback: (response: CommandSocketResponseMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>>, timeReceived: number): void => {
							
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
	
	/**
	 * Asynchronously executes a command on the remote CommandSocket, returning a Promise that resolves to the return
	 * value of the executed Command.
	 *
	 * @param command The string Command identifier of the Command to be executed.
	 * @param params The parameter(s) to pass to the Command to be executed.
	 * @return A Promise which resolves to the return value of the executed Command.
	 */
	public async invoke<CommandName extends CommandNameInCommandSet<FullCommandSet<RCS>>>(
		command: CommandName, params: ParameterOf<FullCommandSet<RCS>, CommandName>): Promise<ReturnTypeOf<FullCommandSet<RCS>, CommandName>> {
		
		// TODO [11/26/19 @ 2:12 AM] - Add error when invoking on closed CommandSocket.
	
		let response: CommandSocketResponseMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, CommandName>> = await this.rawRequest(command, params);
		
		if (response.meta.didError) throw response.return;
		else return response.return as ReturnTypeOf<FullCommandSet<RCS>, CommandName>;
	
	}
	
	public async ping(): Promise<number> {
		
		// FIX-ME [2/21/20 @ 10:12 PM] - The type coercions in the next line are gross
		let response: CommandSocketResponseMessage<CommandStructureInCommandSet<FullCommandSet<RCS>, "commandsocket ping">> =
			await this.rawRequest("commandsocket ping" as any, "Ping!" as any);
		
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
				
				let returnValue: any = await this.getCommandRegistry().execute(request.command as any, request.parameters as any, this);
				
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
	
	public getMetadata(): Partial<M> {
		
		return this.metadata;
		
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