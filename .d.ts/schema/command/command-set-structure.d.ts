import { CommandStructure } from "./command-structure";
import { KnownKeys } from "../../util/known-keys";
import { IfAny } from "../../util/any-types";
export interface CommandSetStructure {
    [commandName: string]: CommandStructure;
}
export declare type CommandNameInCommandSet<CS extends CommandSetStructure> = IfAny<CS, string, keyof CS & KnownKeys<CS>>;
export declare type CommandStructureInCommandSet<CS extends CommandSetStructure, CN extends keyof CS = CommandNameInCommandSet<CS>> = IfAny<CS, CommandStructure<any>, CS[CN]>;
