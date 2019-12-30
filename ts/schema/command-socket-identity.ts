/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	7:47 PM -- October 28th, 2019.
 *	Project: @command-socket/core
 */

/**
 * An interface representing the unique identity of some {@link CommandSocket} object.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface CommandSocketIdentity {

	readonly id: string;
	
	readonly ip: string;

}