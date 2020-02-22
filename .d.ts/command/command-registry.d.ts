import { CommandSocket } from "../command-socket/command-socket";
import { CommandStructureInCommandSet, CommandNameInCommandSet, CommandSetStructure } from "../schema/command/command-set-structure";
import { IfAny } from "../util/any-types";
import { CommandStructureParameterType, CommandStructureReturnType } from "../schema/command/command-structure";
import { CommandExecutableFunction } from "../schema/command/command-executable-function";
import { Command } from "../schema/command/command";
export declare class CommandRegistry<CommandSet extends CommandSetStructure = any> {
    private commandMap;
    constructor();
    protected static normalizeCommand<CommandSet extends CommandSetStructure>(command: Command<CommandStructureInCommandSet<CommandSet>>): CommandExecutableFunction<CommandStructureInCommandSet<CommandSet>>;
    addCommand<CommandName extends CommandNameInCommandSet<CommandSet>>(commandName: CommandName, command: Command<CommandStructureInCommandSet<CommandSet, CommandName>>): void;
    hasCommand(command: string): boolean;
    getCommand<CommandName extends CommandNameInCommandSet<CommandSet>>(command: CommandName): IfAny<CommandSet, CommandExecutableFunction<any> | undefined, CommandExecutableFunction<CommandStructureInCommandSet<CommandSet, CommandName>>>;
    execute<CommandName extends CommandNameInCommandSet<CommandSet>>(commandName: CommandName, params: CommandStructureParameterType<CommandStructureInCommandSet<CommandSet, CommandName>>, context: CommandSocket): Promise<IfAny<CommandSet, any, CommandStructureReturnType<CommandStructureInCommandSet<CommandSet, CommandName>>>>;
}
