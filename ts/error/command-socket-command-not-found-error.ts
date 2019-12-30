/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:13 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandSocketError } from "./command-socket-error";

/**
 * An error to be thrown when an attempt is made to execute a non-existent command.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketCommandNotFoundError extends CommandSocketError {
	
	public constructor(command: string) {
	
		super(
			"Attempted to call a command that does not exist in the command registry: '" + command + "'.",
			"CommandSocketCommandNotFoundError"
		);
	
	}
	
}