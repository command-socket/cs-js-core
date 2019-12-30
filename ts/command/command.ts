/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:39 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandStructure } from "../schema/command-structure";
import { CommandSocket } from "../command-socket/command-socket";

/**
 * An interface representing the basic form of an executable command.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface Command<C extends CommandStructure, N extends string = string> {

	getName(): N;
	
	execute(params: C["params"], context: CommandSocket): Promise<C["return"]>;

}