/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:55 PM -- October 30th, 2019.
 *	Project: @command-socket/core
 */

import { CommandSetStructure } from "../schema/command/command-set-structure";
import { PingCommandStructure } from "./commands/ping-command";
import { IdentifyCommandStructure } from "./commands/identify-command";
import { TimedResponseCommandStructure } from "./commands/debug/timed-response-command";

/**
 * The set of commands that come built-in with CommandSocket.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface BuiltinCommandSet extends CommandSetStructure {

	"commandsocket identify": IdentifyCommandStructure;
	
	"commandsocket ping": PingCommandStructure;
	
	"commandsocket debug timed-response": TimedResponseCommandStructure;

}