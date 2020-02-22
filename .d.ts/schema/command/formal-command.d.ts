import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "./command-structure";
import { CommandSocket } from "../../command-socket/command-socket";
export declare type FormalCommandResolveType<C extends CommandStructure> = PromiseLike<CommandStructureReturnType<C>> | CommandStructureReturnType<C>;
export interface FormalCommand<C extends CommandStructure> {
    execute(params: CommandStructureParameterType<C>, context: CommandSocket): Promise<CommandStructureReturnType<C>>;
}
