import { CommandSetStructure } from "../../schema/command-set-structure";
import { AddCommandStructure } from "./add-command";
export interface TestCommandSet extends CommandSetStructure {
    add: AddCommandStructure;
}
