import { CommandStructure } from "./command-structure";
import { FormalCommand } from "./formal-command";
import { CommandExecutableFunction } from "./command-executable-function";
export declare type Command<C extends CommandStructure> = FormalCommand<C> | CommandExecutableFunction<C>;
