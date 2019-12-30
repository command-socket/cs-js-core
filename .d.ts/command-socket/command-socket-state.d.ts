export declare class CommandSocketState {
    static readonly CONNECTING: CommandSocketState;
    static readonly OPEN: CommandSocketState;
    static readonly CLOSED: CommandSocketState;
    private readonly usable;
    protected constructor(usable: boolean);
    isUsable(): boolean;
}
