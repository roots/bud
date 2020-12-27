import {Framework} from './'

/**
 * String keyed value.
 */
export type Index<T> = {[key: string]: T}

/**
 * Constructable function/class yielding T type
 */
export interface Constructor<T> {
  new (params?: unknown): T
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Fluent<T> {
  function(this: T): T
}

export type Use = (
  this: Framework,
  extensions: Array<string | Use.Tuple>,
) => Framework

export namespace Use {
  export type Tuple =
    | [string, Framework.Module]
    | [string, Factory<Framework, Framework.Module>]
}

export type When = (
  this: Framework,
  test: boolean,
  isTrue: (bud: Framework) => unknown,
  isFalse?: (bud: Framework) => unknown,
) => Framework

/**
 * Produces a value.
 */
export type Factory<O = unknown, I = unknown> = (args: I) => O

/**
 * Might be a function that produces a value, might be
 * the value itself.
 */
export type MaybeCallable<O = unknown, A = unknown> =
  | Factory<O, A>
  | O
