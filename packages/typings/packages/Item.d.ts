import type {Bud, Build, Index, MaybeCallable, Webpack} from '.'

export declare class Contract {
  bud: Bud

  ident?: Module.Ident

  loader?: Module.Loader

  options?: Module.Options

  query?: Module.Query

  propMap: () => Index<[Property, Index<string> | Bud]>

  getIdent: Getter<Module.Ident>

  getLoader: Getter<Module.Loader>

  getOptions: Getter<Module.Options>

  getQuery: Getter<Module.Query>

  set: Setter<Module>

  setIdent: Setter<Module.Ident>

  setLoader: Setter<Module.Loader>

  setOptions: Setter<Module.Options>

  setQuery: Setter<Module.Query>

  make: () => RuleSetLoader
}

/**
 * @see {Rule.Module}
 */
export type RuleSetLoader = {
  /**
   * Unique loader identifier
   */
  ident?: string

  /**
   * Loader name
   */
  loader?: string

  /**
   * Loader options
   */
  options?: Index<any>

  /**
   * Loader query
   */
  query?: Webpack.RuleSetQuery
}

export type Getter<T> = () => T

export type Setter<T> = (prop: T) => void

export type Product = {
  ident?: MaybeCallable<string>
  loader?: MaybeCallable<string>
  options?: MaybeCallable<Webpack.RuleSetLoader['options']>
  query?: MaybeCallable<Module.Query>
}

export type Factory<OutType> = (any) => OutType

export type Module = {
  ident?: Module.Ident
  loader?: Module.Loader
  options?: Module.Options
  query?: Module.Query
}

export namespace Module {
  export type Ident = MaybeCallable<string>
  export type Loader = MaybeCallable<string>
  export type Options = MaybeCallable<
    Webpack.RuleSetLoader['options']
  >
  export type Query = MaybeCallable<Webpack.RuleSetQuery>
}

export type Property =
  | string
  | string
  | {[k: string]: any} // do not support 'string' from query
  | Webpack.RuleSetLoader['query']

export type Untapped = MaybeCallable<Property>

export type PropertyTuple = [string, MaybeCallable<Property>]

export type Valid = Omit<Untapped, undefined | null>[]
