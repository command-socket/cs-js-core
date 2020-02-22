/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:51 PM -- February 21st, 2020.
 *	Project: CommandSocket - Core
 */

// DOC-ME [2/21/20 @ 4:20 PM] - Documentation required!
export type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

// DOC-ME [2/21/20 @ 4:20 PM] - Documentation required!
export type IsAny<T> = IfAny<T, true, never>;