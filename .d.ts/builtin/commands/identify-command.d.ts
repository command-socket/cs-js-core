import { FormalCommand } from "../../schema/command/formal-command";
import { CommandSocket } from "../../command-socket/command-socket";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../schema/command/command-structure";
import { CommandSocketIdentity } from "../../schema/command-socket-identity";
export declare class IdentifyCommand implements FormalCommand<IdentifyCommandStructure> {
    execute(params: CommandStructureParameterType<IdentifyCommandStructure>, context: CommandSocket): Promise<CommandStructureReturnType<IdentifyCommandStructure>>;
}
export interface IdentifyCommandStructure extends CommandStructure<void, CommandSocketIdentity> {
}
