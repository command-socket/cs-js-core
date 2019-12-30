/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:04 PM -- October 29th, 2019.
 *	Project: @command-socket/core
 */

/**
 * An enumeration of valid 'close codes' for {@link CommandSocket}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CloseCode {
	
	// just an example
	public static readonly INVALID_MESSAGE_RECEIVED: CloseCode = new CloseCode();
	
	protected constructor() { }
	
}