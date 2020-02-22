/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:51 AM -- November 27th, 2019.
 *	Project: CommandSocket - Core
 */

import { FormalCommand, FormalCommandResolveType } from "../../../schema/command/formal-command";
import {
	CommandStructure,
	CommandStructureParameterType,
	CommandStructureReturnType
} from "../../../schema/command/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class TimedResponseCommand implements FormalCommand<TimedResponseCommandStructure> {
	
	public async execute(params: CommandStructureParameterType<TimedResponseCommandStructure>,
						 context: CommandSocket): Promise<CommandStructureReturnType<TimedResponseCommandStructure>> {
		
		return new Promise<CommandStructureReturnType<TimedResponseCommandStructure>>(
			(resolve: (value?: FormalCommandResolveType<TimedResponseCommandStructure>) => void): void => {
			
			setTimeout(() => resolve("Waited " + params + "ms and responded."), params);
			
		});
		
	}
	
}

export interface TimedResponseCommandStructure
	extends CommandStructure<number, string> { }