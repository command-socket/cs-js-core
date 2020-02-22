import { CommandStructure, CommandStructureName, CommandStructureParameterType, CommandStructureReturnType } from "../schema/command-structure";
import { CommandSocket } from "../command-socket/command-socket";
export interface Command<C extends CommandStructure> {
    getName(): CommandStructureName<C>;
    execute(params: CommandStructureParameterType<C>, context: CommandSocket): Promise<CommandStructureReturnType<C>>;
}
