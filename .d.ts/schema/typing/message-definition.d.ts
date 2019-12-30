import { ObjectTypeDefinition, Type } from "typit";
export declare class MessageDefinition implements ObjectTypeDefinition {
    constructor(parametersType?: Type, returnType?: Type);
    readonly command: Type;
    readonly meta: ObjectTypeDefinition;
    readonly parameters: Type;
    readonly return: Type;
    [property: string]: Type | ObjectTypeDefinition;
}
export declare const CommandSocketIdentityDefinition: ObjectTypeDefinition;
