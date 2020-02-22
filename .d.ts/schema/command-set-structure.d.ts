import { CommandStructure } from "./command-structure";
import { KnownKeys } from "../util/known-keys";
export interface CommandSetStructure {
    [commandName: string]: CommandStructure;
}
export declare type CommandNameInCommandSet<CS extends CommandSetStructure> = keyof CS & KnownKeys<CS>;
export declare type CommandInCommandSet<CS extends CommandSetStructure, CN extends keyof CS = CommandNameInCommandSet<CS>> = CS[CN];
export declare type CommandSetWithCommand<C extends CommandStructure> = C extends CommandStructure<infer P, infer R, infer N> ? Record<N, C> : never;
