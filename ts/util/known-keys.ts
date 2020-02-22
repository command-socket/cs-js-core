/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	2:40 PM -- February 21st, 2020.
 *	Project: CommandSocket - Core
 */

/**
 * Removes the index signature from indexable types, returning a union of the well-defined keys of the type.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export type KnownKeys<T> = {
	[K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;