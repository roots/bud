export declare type Index<T> = {[key: string]: T}

export declare interface Constructor<T> {
  new (params?: unknown): T
}

export declare interface Fluent<T, O = any> {
  function(this: T, params?: O): T
}

export declare type Factory<ReturnType = unknown, Args = unknown> = (
  args?: Args,
) => ReturnType

export declare type OneOrMany<T> = T | T[]

export declare type MaybeCallable<T = unknown, A = unknown> =
  | Factory<T, A>
  | T
