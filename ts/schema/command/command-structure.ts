/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:58 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

/**
 * An interface representing the structure of a command.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface CommandStructure<ParameterType = any, ReturnType = any> {
	
	readonly parameter: ParameterType;
	
	readonly return: ReturnType;

}

export type CommandStructureParameterType<C extends CommandStructure> =
	C extends CommandStructure<infer P> ? P : never;

export type CommandStructureReturnType<C extends CommandStructure> =
	C extends CommandStructure<infer P, infer R> ? R : never;
