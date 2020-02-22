import { Command } from "./command";
import { CommandSocket } from "../command-socket/command-socket";
import { CommandInCommandSet, CommandNameInCommandSet, CommandSetStructure } from "../schema/command-set-structure";
import { IfAny } from "../util/any-types";
import { CommandStructureParameterType, CommandStructureReturnType } from "../schema/command-structure";
declare type ExecuteFunctionType<CS extends CommandSetStructure, CN extends keyof CS> = (params: CommandStructureParameterType<CommandInCommandSet<CS, CN>>, context: CommandSocket) => Promise<CommandStructureReturnType<CommandInCommandSet<CS, CN>>>;
export declare class CommandRegistry<CommandSet extends CommandSetStructure = any> {
    private commandMap;
    constructor(...commands: Array<Command<CommandInCommandSet<CommandSet>>>);
    addCommands(...commands: Array<Command<CommandInCommandSet<CommandSet>>>): void;
    addInlineCommand<CommandName extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(commandName: CommandName, implementation: ExecuteFunctionType<CommandSet, CommandName>): void;
    hasCommand(command: string): boolean;
    getCommand<C extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(command: C): IfAny<CommandSet, Command<any>, Command<CommandSet[C]>>;
    execute<CommandName extends IfAny<CommandSet, string, CommandNameInCommandSet<CommandSet>>>(commandName: CommandName, params: CommandStructureParameterType<CommandInCommandSet<CommandSet, CommandName>>, context: CommandSocket): Promise<IfAny<CommandSet, any, CommandStructureReturnType<CommandInCommandSet<CommandSet, CommandName>>>>;
}
export {};
