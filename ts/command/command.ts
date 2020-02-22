/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:39 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandStructure, CommandStructureName, CommandStructureParameterType, CommandStructureReturnType } from "../schema/command-structure";
import { CommandSocket } from "../command-socket/command-socket";

/**
 * An interface representing the basic form of an executable command.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface Command<C extends CommandStructure> {
	
	/**
	 * Returns the name of the Command.
	 *
	 * @return the name of the Command.
	 */
	getName(): CommandStructureName<C>;
	
	/**
	 * Executes the Command with the provided parameters and within the provided context, returning the resulting value.
	 *
	 * @param params The parameters with which to execute this Command.
	 * @param context The CommandSocket context with which to execute this Command.
	 * @return The return value of the executed Command.
	 */
	execute(params: CommandStructureParameterType<C>, context: CommandSocket): Promise<CommandStructureReturnType<C>>;
	
}