import { Command } from "./command";
import { CommandSetStructure } from "../schema/command-set-structure";
import { CommandSocket } from "../command-socket/command-socket";
export declare class CommandRegistry<CS extends CommandSetStructure = any> {
    private commandMap;
    constructor(...commands: Array<Command<CS[keyof CS]>>);
    addCommands(...commands: Array<Command<CS[keyof CS]>>): void;
    hasCommand(command: string): boolean;
    getCommand<C extends keyof CS = keyof CS>(command: C): Command<CS[C]> | undefined;
    execute<C extends keyof CS = keyof CS>(command: C, params: CS[C]["params"], context: CommandSocket<any, any>): Promise<CS[C]["return"]>;
}
