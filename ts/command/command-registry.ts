/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:36 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { Command } from "./command";
import { CommandSocketCommandNotFoundError } from "../error/command-socket-command-not-found-error";
import { CommandSocket } from "../command-socket/command-socket";
import { CommandInCommandSet, CommandNameInCommandSet, CommandSetStructure } from "../schema/command-set-structure";
import { IfAny } from "../util/any-types";
import {
	CommandStructureParameterType,
	CommandStructureReturnType
} from "../schema/command-structure";

type ExecuteFunctionType<CS extends CommandSetStructure, CN extends keyof CS> =
	(params: CommandStructureParameterType<CommandInCommandSet<CS, CN>>,
	 context: CommandSocket) => Promise<CommandStructureReturnType<CommandInCommandSet<CS, CN>>>;

/**
 * A registry of {@link Command}s, accessible via their string identifiers.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandRegistry<CommandSet extends CommandSetStructure = any> {
	
	/**
	 * A map from {@link Command} identifiers to Commands.
	 */
	private commandMap: Map<string, Command<any>>;
	
	/**
	 * Initializes a new CommandRegistry with the provided list of {@link Command}s.
	 *
	 * @param commands The array of Commands to include in the newly initialized CommandRegistry.
	 */
	public constructor(...commands: Array<Command<CommandInCommandSet<CommandSet>>>) {
	
		this.commandMap = new Map();
		
		this.addCommands(...commands);
	
	}
	
	/**
	 * Adds one or more {@link Command}s to this CommandRegistry instance.
	 *
	 * @param commands The Command(s) to add to this CommandRegistry instance.
	 */
	public addCommands(...commands: Array<Command<CommandInCommandSet<CommandSet>>>): void {
		
		// TODO [1/16/20 @ 8:25 AM] - Add in handling for erroring on duplicated command names.
		
		for (let command of commands) {
			
			this.commandMap.set(command.getName(), command);
			
		}
		
	}
	
	// DOC-ME [2/21/20 @ 9:55 PM] - Documentation required!
	public addInlineCommand<CommandName extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(
		commandName: CommandName, implementation: ExecuteFunctionType<CommandSet, CommandName>): void {
		
		let command: Command<CommandInCommandSet<CommandSet>> = new class {
			
			public getName: () => CommandName = (): CommandName => commandName;
			
			public execute: ExecuteFunctionType<CommandSet, CommandName> = implementation;
			
		} as unknown as Command<CommandInCommandSet<CommandSet>>;
		
		this.addCommands(command);
		
	}
	
	/**
	 * Returns true if this CommandRegistry instance contains a {@link Command} with the provided identifier.
	 *
	 * @param command The string Command identifier to check for existence within this CommandRegistry instance.
	 * @return true if this CommandRegistry instance contains a Command with the provided identifier.
	 */
	public hasCommand(command: string): boolean {
		
		return this.commandMap.has(command);
		
	}
	
	/**
	 * Returns the {@link Command} associated with the provided Command identifier if such a Command exists, otherwise
	 * returning undefined.
	 *
	 * @param command The string Command identifier for which to return a Command.
	 * @return The Command associated with the provided Command identifier if such a Command exists, otherwise returning
	 * undefined.
	 * @see CommandRegistry#hasCommand
	 */
	public getCommand<C extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(command: C):
		IfAny<CommandSet, Command<any>, Command<CommandSet[C]>> {
		
		return this.commandMap.get(command as string) as (IfAny<CommandSet, Command<any>, Command<CommandSet[C]>>);
		
	}
	
	// DOC-ME [1/13/20 @ 12:37 PM] - Documentation required!
	public async execute<CommandName extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(
		commandName: CommandName, params: CommandStructureParameterType<CommandInCommandSet<CommandSet, CommandName>>,
		context: CommandSocket):
		Promise<IfAny<CommandSet, any, CommandStructureReturnType<CommandInCommandSet<CommandSet, CommandName>>>> {
		
		if (this.hasCommand(commandName as string)) {
			
			let command: Command<CommandSet[CommandName]> =
				this.commandMap.get(commandName as string) as Command<CommandSet[CommandName]>;
			
			return (await command.execute(params, context)) as unknown as
				IfAny<CommandSet, any, CommandStructureReturnType<CommandSet[CommandName]>>;
			
		} else throw new CommandSocketCommandNotFoundError(commandName as string);
		
	}
	
}