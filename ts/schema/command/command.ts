/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:32 PM -- February 22nd, 2020.
 *	Project: CommandSocket - Core
 */

import { CommandStructure } from "./command-structure";
import { FormalCommand } from "./formal-command";
import { CommandExecutableFunction } from "./command-executable-function";

// DOC-ME [2/22/20 @ 1:33 PM] - Documentation required!
export type Command<C extends CommandStructure> = FormalCommand<C> | CommandExecutableFunction<C>;