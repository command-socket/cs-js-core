import { Command } from "../../../command/command";
import { CommandStructure } from "../../../schema/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
export declare class TimedResponseCommand implements Command<TimedResponseCommandStructure> {
    getName(): "commandsocket debug timed-response";
    execute(params: TimedResponseCommandStructure["parameter"], context: CommandSocket): Promise<TimedResponseCommandStructure["return"]>;
}
export interface TimedResponseCommandStructure extends CommandStructure<number, string, "commandsocket debug timed-response"> {
}
