import { CommandStructure } from "../../schema/command-structure";
import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";
export declare class PingCommand implements Command<PingCommandStructure, "commandsocket ping"> {
    getName(): "commandsocket ping";
    execute(params: PingCommandStructure["params"], context: CommandSocket): Promise<PingCommandStructure["return"]>;
}
export interface PingCommandStructure extends CommandStructure {
    params: "Ping!";
    return: "Pong!";
}
