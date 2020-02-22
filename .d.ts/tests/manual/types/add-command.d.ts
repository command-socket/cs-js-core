import { FormalCommand } from "../../../schema/command/formal-command";
import { CommandStructure, CommandStructureParameterType, CommandStructureReturnType } from "../../../schema/command/command-structure";
import { CommandSocket } from "../../../command-socket/command-socket";
import { TestCommandSet } from "./test-command-set";
export declare class AddCommand implements FormalCommand<AddCommandStructure> {
    getName(): "sum";
    execute(params: CommandStructureParameterType<TestCommandSet["sum"]>, context: CommandSocket): Promise<CommandStructureReturnType<TestCommandSet["sum"]>>;
}
export interface AddCommandStructure extends CommandStructure {
    readonly parameter: number[];
    readonly return: number;
    readonly name: "sum";
}
