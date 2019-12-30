/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	9:32 AM -- November 26th, 2019.
 *	Project: CommandSocket - Core
 */

import { CommandStructure } from "../../schema/command-structure";
import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class PingCommand implements Command<PingCommandStructure, "commandsocket ping"> {
	
	public getName(): "commandsocket ping" {
		
		return "commandsocket ping";
		
	}
	
	public async execute(params: PingCommandStructure["params"],
				   context: CommandSocket): Promise<PingCommandStructure["return"]> {
		
		return "Pong!";
		
	}
	
}

export interface PingCommandStructure extends CommandStructure {
	
	params: "Ping!";
	
	return: "Pong!";
	
}