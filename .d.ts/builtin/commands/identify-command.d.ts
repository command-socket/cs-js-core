import { Command } from "../../command/command";
import { CommandSocket } from "../../command-socket/command-socket";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../schema/command-structure";
import { CommandSocketIdentity } from "../../schema/command-socket-identity";
export declare class IdentifyCommand implements Command<IdentifyCommandStructure> {
    getName(): "commandsocket identify";
    execute(params: CommandStructureParameterType<IdentifyCommandStructure>, context: CommandSocket): Promise<CommandStructureReturnType<IdentifyCommandStructure>>;
}
export interface IdentifyCommandStructure extends CommandStructure<void, CommandSocketIdentity, "commandsocket identify"> {
}
