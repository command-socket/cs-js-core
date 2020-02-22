import { CommandSocket } from "../../../command-socket/command-socket";
import { CommandSetStructure } from "../../../schema/command/command-set-structure";
export declare class TestCommandSocketImplementation<LCS extends CommandSetStructure = any, RCS extends CommandSetStructure = any> extends CommandSocket<LCS, RCS> {
    constructor();
}
