/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:53 PM -- June 11th, 2019.
 *	Project: @command-socket/core
 */

/* tslint:disable:align */

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

// Abstract CommandSocket implementation.
export { CommandSocket, FullCommandSet } from "./command-socket/command-socket";

// The generic socket interfaces to be implemented by each environment-specific implementation.
export {
	ISocket,
	SocketEvents
} from "./socket/i-socket";

// Schema-related classes.
export { CommandSetStructure } from "./schema/command-set-structure";
export { CommandStructure } from "./schema/command-structure";
export { CommandSocketIdentity } from "./schema/command-socket-identity";
	
	// Message schema-related classes.
	export {
		CommandSocketMessage,
		CommandSocketResponseMessage,
		CommandSocketRequestMessage,
		CommandSocketSerializedError,
		CORRESPONDENCE_ID_LENGTH
	} from "./schema/message/command-socket-message";
	export { CommandSocketMessageFactory } from "./schema/message/command-socket-message-factory";
	
	// Message typing-related classes.
	export { MessageDefinition } from "./schema/typing/message-definition";

// Error classes.
export { CommandSocketError } from "./error/command-socket-error";
export { CommandSocketServerError } from "./error/command-socket-server-error";
export { CommandSocketCommandNotFoundError } from "./error/command-socket-command-not-found-error";
export { CommandSocketMalformedMessageError } from "./error/command-socket-malformed-message-error";
export { CommandSocketMisplacedResponseError } from "./error/command-socket-misplaced-response-error";

// Command structure-related classes
export { Command } from "./command/command";
export { CommandRegistry } from "./command/command-registry";

// Built-in commands and etc.
export { BuiltinCommandSet } from "./builtin/builtin-command-set";
export { IdentifyCommand, IdentifyCommandStructure } from "./builtin/commands/identify-command";

// Utility classes.
import * as IDUtilities from "./util/id-utilities";
export { IDUtilities };
