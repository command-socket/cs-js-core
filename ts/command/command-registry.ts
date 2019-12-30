/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	3:36 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { Command } from "./command";
import { CommandSetStructure } from "../schema/command-set-structure";
import { CommandSocketCommandNotFoundError } from "../error/command-socket-command-not-found-error";
import { CommandSocket } from "../command-socket/command-socket";

/**
 * A registry of commands, accessible via their names.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandRegistry<CS extends CommandSetStructure = any> {
	
	private commandMap: Map<keyof CS, Command<CS[keyof CS]>>;
	
	public constructor(...commands: Array<Command<CS[keyof CS]>>) {
	
		this.commandMap = new Map<keyof CS, Command<CS[keyof CS]>>();
		
		this.addCommands(...commands);
	
	}
	
	public addCommands(...commands: Array<Command<CS[keyof CS]>>): void {
		
		for (let command of commands) this.commandMap.set(command.getName() as keyof CS, command);
		
	}
	
	public hasCommand(command: string): boolean {
		
		return this.commandMap.has(command as keyof CS);
		
	}
	
	public getCommand<C extends keyof CS = keyof CS>(command: C): Command<CS[C]> | undefined {
		
		return this.commandMap.get(command) as Command<CS[C]> | undefined;
		
	}
	
	public async execute<C extends keyof CS = keyof CS>(
		command: C, params: CS[C]["params"], context: CommandSocket<any, any>):
		Promise<CS[C]["return"]> {
		
		if (this.hasCommand(command as string)) {
			
			// FIX-ME [11/26/19 @ 2:02 AM] - This is not a correct fix.
			return await (this.commandMap.get(command) as unknown as Command<CS[C]>).execute(params, context);
			
		} else throw new CommandSocketCommandNotFoundError(command as string);
		
	}
	
}