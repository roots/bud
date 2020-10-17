export type Index<T> = {[key: string]: T}

export type Fluent<T> = (this: T, unknown?: unknown) => T

export type Factory<OutType> = (any) => OutType
export type MaybeCallable<T> = Factory<T> | T
