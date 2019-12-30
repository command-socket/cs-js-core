/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:55 AM -- November 20th, 2019.
 *	Project: @command-socket/core
 */

import { CommandSocketError } from "./command-socket-error";

/**
 * A CommandSocketError representing an otherwise-unidentified error from the server.
 *
 * Any error thrown during command execution on the server-side w
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketServerError extends CommandSocketError {
	
	public constructor(message?: string) {
	
		super(message ?? "A server error occurred.", "CommandSocketServerError");
	
	}
	
}