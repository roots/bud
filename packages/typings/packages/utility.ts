export type Index<T> = {[key: string]: T}

/**
 * Constructable function/class yielding T type
 */
export interface Constructor<T> {
  new (params: any): T
}

/**
 * Keyed service tuples. Useful for passing
 * maps of services as an object.
 */
export type Services = Index<Service.Tuple>

export namespace Service {
  /**
   * A service constructor.
   */
  export interface Constructor<T>
    extends Framework.Constructor<T> {
    new (params?: Index<any>): T
  }

  export type Dependency = [string, unknown]
  export type Dependencies = Array<Dependency> | Dependency

  export type Tuple = [
    service: Constructor<any>,
    deps?: Dependencies,
  ]
}

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
