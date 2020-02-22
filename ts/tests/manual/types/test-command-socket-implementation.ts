/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:58 PM -- February 20th, 2020.
 *	Project: CommandSocket - Core
 */

import { CommandSocket } from "../../../command-socket/command-socket";
import { CommandSetStructure } from "../../../schema/command/command-set-structure";
import { ISocket } from "../../../socket/i-socket";

/**
 * An incomplete implementation of the CommandSocket abstract class for testing purposes.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class TestCommandSocketImplementation<LCS extends CommandSetStructure = any, RCS extends CommandSetStructure = any>
	extends CommandSocket<LCS, RCS> {
	
	public constructor() {
	
		super(undefined as unknown as ISocket);
	
	}
	
}