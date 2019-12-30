import { CommandStructure as CSCommandStructure } from "./command-structure";
import { BuiltinCommandSet } from "../builtin/builtin-command-set";
export interface CommandSetStructure {
    [commandName: string]: CSCommandStructure;
}
export declare type FullCommandSet<CS> = CS & BuiltinCommandSet;
export declare type CommandIn<CS extends CommandSetStructure> = keyof FullCommandSet<CS>;
export declare type ParamTypeFor<CS extends CommandSetStructure, C extends keyof CS> = FullCommandSet<CS>[C]["params"];
export declare type ReturnTypeFor<CS extends CommandSetStructure, C extends keyof CS> = FullCommandSet<CS>[C]["return"];
