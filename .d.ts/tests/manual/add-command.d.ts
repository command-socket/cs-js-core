import { Command } from "../../command/command";
import { CommandStructure } from "../../schema/command-structure";
import { CommandSocket } from "../../command-socket/command-socket";
export declare class AddCommand implements Command<AddCommandStructure, "add"> {
    getName(): "add";
    execute(params: AddCommandStructure["params"], context: CommandSocket): Promise<AddCommandStructure["return"]>;
}
export interface AddCommandStructure extends CommandStructure {
    params: number[];
    return: number;
}
