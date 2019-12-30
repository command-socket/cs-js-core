import { Command } from "../../../command/command";
import { CommandStructure } from "../../../schema/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
export declare class TimedResponseCommand implements Command<TimedResponseCommandStructure, "commandsocket debug timed-response"> {
    getName(): "commandsocket debug timed-response";
    execute(params: TimedResponseCommandStructure["params"], context: CommandSocket): Promise<TimedResponseCommandStructure["return"]>;
}
export interface TimedResponseCommandStructure extends CommandStructure {
    params: number;
    return: string;
}
