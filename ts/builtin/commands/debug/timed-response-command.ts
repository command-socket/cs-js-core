/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:51 AM -- November 27th, 2019.
 *	Project: CommandSocket - Core
 */

import { Command } from "../../../command/command";
import { CommandStructure } from "../../../schema/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class TimedResponseCommand implements Command<TimedResponseCommandStructure> {
	
	public getName(): "commandsocket debug timed-response" {
		
		return "commandsocket debug timed-response";
		
	}
	
	public async execute(params: TimedResponseCommandStructure["parameter"],
						 context: CommandSocket): Promise<TimedResponseCommandStructure["return"]> {
		
		return new Promise<TimedResponseCommandStructure["return"]>(
			(resolve: (value?: (PromiseLike<TimedResponseCommandStructure["return"]> | TimedResponseCommandStructure["return"])) => void): void => {
			
			setTimeout(() => resolve("Waited " + params + "ms and responded."), params);
			
		});
		
	}
	
}

export interface TimedResponseCommandStructure
	extends CommandStructure<number, string, "commandsocket debug timed-response"> { }