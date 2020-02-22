/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:59 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { FormalCommand } from "../../../schema/command/formal-command";
import {
	CommandStructure,
	CommandStructureParameterType,
	CommandStructureReturnType
} from "../../../schema/command/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
import { TestCommandSet } from "./test-command-set";

/**
 * A command that adds two numbers together.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class AddCommand implements FormalCommand<AddCommandStructure> {
	
	public getName(): "sum" {
		
		return "sum";
		
	}
	
	public async execute(
		params: CommandStructureParameterType<TestCommandSet["sum"]>,
		context: CommandSocket): Promise<CommandStructureReturnType<TestCommandSet["sum"]>> {
		
		let result: number = 0;
		
		for (let operand of params) result += operand;
		
		return result;
		
	}
	
}

export interface AddCommandStructure extends CommandStructure {
	
	readonly parameter: number[];
	
	readonly return: number;
	
	readonly name: "sum";
	
}