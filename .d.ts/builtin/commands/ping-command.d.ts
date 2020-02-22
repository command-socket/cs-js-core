import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../schema/command/command-structure";
import { FormalCommand } from "../../schema/command/formal-command";
import { CommandSocket } from "../../command-socket/command-socket";
export declare class PingCommand implements FormalCommand<PingCommandStructure> {
    execute(params: CommandStructureParameterType<PingCommandStructure>, context: CommandSocket): Promise<CommandStructureReturnType<PingCommandStructure>>;
}
export interface PingCommandStructure extends CommandStructure<"Ping!", "Pong!"> {
}
