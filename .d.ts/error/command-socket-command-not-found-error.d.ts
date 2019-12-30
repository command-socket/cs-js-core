import { CommandSocketError } from "./command-socket-error";
export declare class CommandSocketCommandNotFoundError extends CommandSocketError {
    constructor(command: string);
}
