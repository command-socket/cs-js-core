/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:36 PM -- February 22nd, 2020.
 *	Project: CommandSocket - Core
 */

import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "./command-structure";
import { CommandSocket } from "../../command-socket/command-socket";

export type CommandExecutableFunction<C extends CommandStructure> =
	(params: CommandStructureParameterType<C>, context: CommandSocket) => Promise<CommandStructureReturnType<C>>;