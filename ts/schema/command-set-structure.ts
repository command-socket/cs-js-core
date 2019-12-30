/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:56 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandStructure as CSCommandStructure } from "./command-structure";
import { BuiltinCommandSet } from "../builtin/builtin-command-set";

/**
 * An interface representing a set of commands.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface CommandSetStructure {

	[commandName: string]: CSCommandStructure;

}

export type FullCommandSet<CS> = CS & BuiltinCommandSet;

export type CommandIn<CS extends CommandSetStructure> = keyof FullCommandSet<CS>;

export type ParamTypeFor<CS extends CommandSetStructure, C extends keyof CS> = FullCommandSet<CS>[C]["params"];

export type ReturnTypeFor<CS extends CommandSetStructure, C extends keyof CS> = FullCommandSet<CS>[C]["return"];