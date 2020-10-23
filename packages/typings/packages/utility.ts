export type Index<T> = {[key: string]: T}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Fluent<
  T,
  P = void,
  P1 = void,
  P2 = void,
  P3 = void,
  P4 = void,
  P5 = void,
  P6 = void
> = (this: T, P?, P1?, P2?, P3?, P4?, P5?, P6?) => T

export type Factory<OutType> = (any) => OutType
export type MaybeCallable<T> = Factory<T> | T
