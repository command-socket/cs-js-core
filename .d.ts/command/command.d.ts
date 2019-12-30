import { CommandStructure } from "../schema/command-structure";
import { CommandSocket } from "../command-socket/command-socket";
export interface Command<C extends CommandStructure, N extends string = string> {
    getName(): N;
    execute(params: C["params"], context: CommandSocket): Promise<C["return"]>;
}
