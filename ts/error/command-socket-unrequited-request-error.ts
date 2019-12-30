/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:45 PM -- November 27th, 2019.
 *	Project: CommandSocket - Core
 */

import { CommandSocketError } from "./command-socket-error";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketUnrequitedRequestError extends CommandSocketError {
	
	public constructor() {
	
		super(
			"This request received no response from the connected CommandSocket before timing out.",
			"CommandSocketUnrequitedRequestError"
		);
	
	}
	
}