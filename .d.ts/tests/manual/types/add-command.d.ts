import { Command } from "../../../command/command";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../../schema/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
import { TestCommandSet } from "./test-command-set";
export declare class AddCommand implements Command<AddCommandStructure> {
    getName(): "sum";
    execute(params: CommandStructureParameterType<TestCommandSet["sum"]>, context: CommandSocket): Promise<CommandStructureReturnType<TestCommandSet["sum"]>>;
}
export interface AddCommandStructure extends CommandStructure {
    readonly parameter: number[];
    readonly return: number;
    readonly name: "sum";
}
