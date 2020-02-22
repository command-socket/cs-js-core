export declare type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
export declare type IsAny<T> = IfAny<T, true, never>;
