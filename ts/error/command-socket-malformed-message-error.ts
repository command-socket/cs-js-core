/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:39 PM -- October 28th, 2019.
 *	Project: @command-socket/core
 */

import { CommandSocketError } from "./command-socket-error";

/**
 * An error occurring when a {@link CommandSocket} receives a malformed message.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketMalformedMessageError extends CommandSocketError {
	
	public constructor(message: string = "CommandSocket received a malformed message.") {
	
		super(message, "CommandSocketMalformedMessageError");
	
	}
	
}