import { CommandSetWithCommand } from "./command-set-structure";
export interface CommandStructure<ParameterType = any, ReturnType = any, Name extends string = string> {
    readonly name: Name;
    readonly parameter: ParameterType;
    readonly return: ReturnType;
}
export declare type CommandStructureParameterType<C extends CommandStructure> = C extends CommandStructure<infer P> ? P : never;
export declare type CommandStructureReturnType<C extends CommandStructure> = C extends CommandStructure<infer P, infer R> ? R : never;
export declare type CommandStructureName<C extends CommandStructure> = C extends CommandStructure<infer P, infer R, infer N> ? N & keyof CommandSetWithCommand<C> : never;
