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

/**
 * Chainable
 */
export interface Fluent<T> {
  function(this: T): T
}

export type Run = () => void

export type Use<T> = (
  this: T,
  extensions: Framework.Module[keyof Framework.Module],
) => T

export namespace Use {
  export type Tuple<T> =
    | [string, Framework.Module]
    | [string, Factory<T, Framework.Module>]
}

export type When<T> = (
  this: T,
  test: boolean,
  isTrue: (bud: T) => unknown,
  isFalse?: (bud: T) => unknown,
) => T

export type Factory<ReturnType = unknown, Args = unknown> = (
  args?: Args,
) => ReturnType

export type OneOrMany<T> = T | T[]

/**
 * Might be a function that produces a value, might be
 * the value itself.
 */
export type MaybeCallable<T = unknown, A = unknown> =
  | Factory<T, A>
  | T

export namespace MappedType {
  export declare type One<T> = {
    [K in keyof T]: T[K]
  }

  export declare type OneOrMany<T> = {
    [K in keyof T]: T[K] | T[K][]
  }

  export declare type Many<T> = {
    [K in keyof T]: T[K][]
  }

  export declare type Callable<T, A> = {
    [K in keyof T]: (args: A) => T[K]
  }

  export declare type MaybeCallable<T, A> = {
    [K in keyof T]: Callable<T, A>[K] | T[K]
  }
}
