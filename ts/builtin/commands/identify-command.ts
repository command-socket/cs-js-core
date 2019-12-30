/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:09 PM -- October 30th, 2019.
 *	Project: @command-socket/core
 */

import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";
import { CommandStructure } from "../../schema/command-structure";
import { CommandSocketIdentity } from "../../schema/command-socket-identity";

/**
 * A CommandSocket builtin command that provides information about the identity of the responding CommandSocket.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class IdentifyCommand implements Command<IdentifyCommandStructure, "commandsocket identify"> {
	
	public getName(): "commandsocket identify" {
		
		return "commandsocket identify";
		
	}
	
	public async execute(
		params: IdentifyCommandStructure["params"], context: CommandSocket):
		Promise<IdentifyCommandStructure["return"]> {
		
		// TODO [11/1/19 @ 12:25 AM] - Add more information to this command's return value.
		
		return await context.getSocketIdentity();
		
	}
	
}

export interface IdentifyCommandStructure extends CommandStructure {
	
	params: void;
	
	return: CommandSocketIdentity;
	
}