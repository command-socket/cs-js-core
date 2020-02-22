/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:36 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandSocketCommandNotFoundError } from "../error/command-socket-command-not-found-error";
import { CommandSocket } from "../command-socket/command-socket";
import { CommandStructureInCommandSet, CommandNameInCommandSet, CommandSetStructure } from "../schema/command/command-set-structure";
import { IfAny } from "../util/any-types";
import {
	CommandStructureParameterType,
	CommandStructureReturnType
} from "../schema/command/command-structure";
import { CommandExecutableFunction } from "../schema/command/command-executable-function";
import { Command } from "../schema/command/command";

type CommandMapKey<CommandSet extends CommandSetStructure> = CommandNameInCommandSet<CommandSet>;

type CommandMapValue<CommandSet extends CommandSetStructure,
	CommandName extends CommandNameInCommandSet<CommandSet> = CommandNameInCommandSet<CommandSet>> =
	CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>>;

/**
 * A registry of {@link Command}s, accessible via their string identifiers.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandRegistry<CommandSet extends CommandSetStructure = any> {
	
	/**
	 * A map from Command identifiers to {@link Command}s.
	 */
	private commandMap: Map<CommandMapKey<CommandSet>, CommandMapValue<CommandSet>>;
	
	/**
	 * Initializes a new CommandRegistry.
	 */
	public constructor() {
	
		this.commandMap = new Map();
	
	}
	
	// DOC-ME [2/22/20 @ 1:55 PM] - Documentation required!
	protected static normalizeCommand<CommandSet extends CommandSetStructure>(
		command: Command<CommandStructureInCommandSet<CommandSet>>): CommandExecutableFunction<CommandStructureInCommandSet<CommandSet>> {
		
		if (typeof command === "function") return command;
		else return command.execute;
		
	}
	
	// DOC-ME [2/22/20 @ 2:59 PM] - Documentation required!
	public addCommand<CommandName extends CommandNameInCommandSet<CommandSet>>(
		commandName: CommandName, command: Command<CommandStructureInCommandSet<CommandSet, CommandName>>): void {
		
		// TODO [1/16/20 @ 8:25 AM] - Add in handling for erroring on duplicated command names.
		
		this.commandMap.set(commandName, CommandRegistry.normalizeCommand<CommandSet>(command));
		
	}
	
	/**
	 * Returns true if this CommandRegistry instance contains a {@link Command} with the provided identifier.
	 *
	 * @param command The string Command identifier to check for existence within this CommandRegistry instance.
	 * @return true if this CommandRegistry instance contains a Command with the provided identifier.
	 */
	public hasCommand(command: string): boolean {
		
		return this.commandMap.has(command as CommandMapKey<CommandSet>);
		
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
	public getCommand<CommandName extends CommandNameInCommandSet<CommandSet>>(command: CommandName):
		IfAny<CommandSet, CommandExecutableFunction<any> | undefined, CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>>> {
		
		return this.commandMap.get(command) as
			IfAny<CommandSet, CommandExecutableFunction<any> | undefined, CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>>>;
		
	}
	
	// DOC-ME [1/13/20 @ 12:37 PM] - Documentation required!
	public async execute<CommandName extends CommandNameInCommandSet<CommandSet>>(
		commandName: CommandName, params: CommandStructureParameterType<CommandStructureInCommandSet<CommandSet, CommandName>>,
		context: CommandSocket):
		Promise<IfAny<CommandSet, any, CommandStructureReturnType<CommandStructureInCommandSet<CommandSet, CommandName>>>> {
		
		if (this.hasCommand(commandName as string)) {
			
			let command: CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>> =
				this.commandMap.get(commandName) as CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>>;
			
			return await command(params, context) as unknown as IfAny<CommandSet, any, CommandStructureReturnType<CommandStructureInCommandSet<CommandSet, CommandName>>>;
			
		} else throw new CommandSocketCommandNotFoundError(commandName as string);
		
	}
	
}