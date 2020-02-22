export interface CommandStructure<ParameterType = any, ReturnType = any> {
    readonly parameter: ParameterType;
    readonly return: ReturnType;
}
export declare type CommandStructureParameterType<C extends CommandStructure> = C extends CommandStructure<infer P> ? P : never;
export declare type CommandStructureReturnType<C extends CommandStructure> = C extends CommandStructure<infer P, infer R> ? R : never;
