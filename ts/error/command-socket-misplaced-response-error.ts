/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:10 PM -- November 20th, 2019.
 *	Project: CommandSocket - Core
 */

import { CommandSocketError } from "./command-socket-error";

/**
 * A CommandSocketError that occurs when a CommandSocket receives a response message for which it does not have a
 * matching and waiting outgoing request.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketMisplacedResponseError extends CommandSocketError {
	
	public constructor() {
	
		super(
			"Received a CommandSocket response message that could not be matched to any outgoing request.",
			"CommandSocketMisplacedResponseError"
		);
	
	}
	
}