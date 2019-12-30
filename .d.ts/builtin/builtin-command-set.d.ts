import { CommandSetStructure } from "../schema/command-set-structure";
import { PingCommandStructure } from "./commands/ping-command";
import { IdentifyCommandStructure } from "./commands/identify-command";
import { TimedResponseCommandStructure } from "./commands/debug/timed-response-command";
export interface BuiltinCommandSet extends CommandSetStructure {
    "commandsocket identify": IdentifyCommandStructure;
    "commandsocket ping": PingCommandStructure;
    "commandsocket debug timed-response": TimedResponseCommandStructure;
}
