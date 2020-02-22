import { FormalCommand } from "../../../schema/command/formal-command";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../../schema/command/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
export declare class TimedResponseCommand implements FormalCommand<TimedResponseCommandStructure> {
    execute(params: CommandStructureParameterType<TimedResponseCommandStructure>, context: CommandSocket): Promise<CommandStructureReturnType<TimedResponseCommandStructure>>;
}
export interface TimedResponseCommandStructure extends CommandStructure<number, string> {
}
