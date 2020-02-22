import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../schema/command-structure";
import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";
export declare class PingCommand implements Command<PingCommandStructure> {
    getName(): "commandsocket ping";
    execute(params: CommandStructureParameterType<PingCommandStructure>, context: CommandSocket): Promise<CommandStructureReturnType<PingCommandStructure>>;
}
export interface PingCommandStructure extends CommandStructure<"Ping!", "Pong!", "commandsocket ping"> {
}
