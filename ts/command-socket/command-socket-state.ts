/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:28 AM -- November 26th, 2019.
 *	Project: CommandSocket - Core
 */

/**
 * An enumeration of the possible states of a {@link CommandSocket}.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketState {
	
	public static readonly CONNECTING: CommandSocketState = new CommandSocketState(false);
	
	public static readonly OPEN: CommandSocketState = new CommandSocketState(true);
	
	public static readonly CLOSED: CommandSocketState = new CommandSocketState(false);
	
	private readonly usable: boolean;
	
	protected constructor(usable: boolean) {
	
		this.usable = usable;
	
	}
	
	public isUsable(): boolean {
		
		return this.usable;
		
	}
	
}