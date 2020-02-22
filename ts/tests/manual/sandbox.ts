/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:57 PM -- February 20th, 2020.
 *	Project: CommandSocket - Core
 */

import { CommandSocket } from "../../command-socket/command-socket";
import { TestCommandSocketImplementation } from "./types/test-command-socket-implementation";
import { TestCommandSet } from "./types/test-command-set";

let cs: CommandSocket<TestCommandSet, TestCommandSet> = new TestCommandSocketImplementation();

cs.getCommandRegistry().addInlineCommand("add", async (params: number[]): Promise<number> => {
	
	return 1;
	
});
