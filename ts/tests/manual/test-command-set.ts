/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:08 PM -- October 21st, 2019.
 *	Project: @command-socket/core
 */

import { CommandSetStructure } from "../../schema/command-set-structure";
import { AddCommandStructure } from "./add-command";

/**
 * A set of commands for testing purposes.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface TestCommandSet extends CommandSetStructure {

	add: AddCommandStructure;

}