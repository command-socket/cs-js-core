import { CommandSetStructure } from "../../../schema/command/command-set-structure";
import { AddCommandStructure } from "./add-command";
export interface TestCommandSet extends CommandSetStructure {
    add: AddCommandStructure;
    sum: {
        parameter: number[];
        return: number;
        name: "sum";
    };
}
