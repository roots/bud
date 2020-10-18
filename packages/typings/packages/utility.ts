export type Index<T> = {[key: string]: T}

export type Fluent<
  T,
  P = void,
  P1 = void,
  P2 = void,
  P3 = void
> = (this: T, P, P1, P2, P3) => T

export type Factory<OutType> = (any) => OutType
export type MaybeCallable<T> = Factory<T> | T
