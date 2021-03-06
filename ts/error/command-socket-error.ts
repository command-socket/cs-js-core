/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:17 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import {
	CommandSocketRequestMessage,
	CommandSocketResponseMessage
} from "../schema/message/command-socket-message";
import { CommandSocketMessageFactory } from "../schema/message/command-socket-message-factory";
import { CommandSocket } from "../command-socket/command-socket";
import { CommandStructure } from "../schema/command/command-structure";

/**
 * An {@link Error} stemming from any action around or related to the execution of a command or an attempt thereof.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketError extends Error {
	
	public constructor(message: string, name: string = "CommandSocketError") {
	
		super(message);
		
		this.name = name;
	
	}
	
	public async toMessage<C extends CommandStructure>(request: CommandSocketRequestMessage<C>,
									   context: CommandSocket): Promise<CommandSocketResponseMessage<C>> {
		
		return await CommandSocketMessageFactory.createResponseMessage(request, this, context, true);
		
	}
	
}