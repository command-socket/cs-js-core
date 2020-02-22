/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:56 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandStructure } from "./command-structure";
import { KnownKeys } from "../util/known-keys";

/**
 * An interface representing a set of commands.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface CommandSetStructure {
	
	/**
	 * Each key must be a string, representing the command name, with each associated value being a
	 * {@link CommandStructure}.
	 */
	[commandName: string]: CommandStructure;

}

// export type CommandNameInCommandSet<CS extends CommandSetStructure> = IfAny<CS, string, keyof CS & KnownKeys<CS>>;

export type CommandNameInCommandSet<CS extends CommandSetStructure> = keyof CS & KnownKeys<CS>;

export type CommandInCommandSet<CS extends CommandSetStructure, CN extends keyof CS = CommandNameInCommandSet<CS>> = CS[CN];

export type CommandSetWithCommand<C extends CommandStructure> =
	C extends CommandStructure<infer P, infer R, infer N> ?
		Record<N, C> :
		never;
