import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";
import { CommandStructure } from "../../schema/command-structure";
import { CommandSocketIdentity } from "../../schema/command-socket-identity";
export declare class IdentifyCommand implements Command<IdentifyCommandStructure, "commandsocket identify"> {
    getName(): "commandsocket identify";
    execute(params: IdentifyCommandStructure["params"], context: CommandSocket): Promise<IdentifyCommandStructure["return"]>;
}
export interface IdentifyCommandStructure extends CommandStructure {
    params: void;
    return: CommandSocketIdentity;
}
