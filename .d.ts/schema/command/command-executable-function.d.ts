import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "./command-structure";
import { CommandSocket } from "../../command-socket/command-socket";
export declare type CommandExecutableFunction<C extends CommandStructure> = (params: CommandStructureParameterType<C>, context: CommandSocket) => Promise<CommandStructureReturnType<C>>;
