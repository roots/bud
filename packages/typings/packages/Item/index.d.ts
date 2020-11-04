import type Webpack from 'webpack'
import {Build} from '../Build'

export {Item}

declare class Item {
  bud: Framework.Bud

  ident?: Item.MaybeCallable<Item.Module.Ident>

  loader?: Item.MaybeCallable<Item.Module.Loader>

  options?: Item.Module.Options

  query?: Item.MaybeCallable<Item.Module.Query>

  propMap: () => Framework.Index<
    [Item.Property, Framework.Index<string> | Framework.Bud]
  >

  getIdent: Item.Getter<Item.Module.Ident>

  getLoader: Item.Getter<Item.Module.Loader>

  getOptions: Item.Getter<Item.Module.Options>

  getQuery: Item.Getter<Item.Module.Query>

  set: Item.Setter<Item.Module>

  setIdent: Item.Setter<Item.Module.Ident>

  setLoader: Item.Setter<Item.Module.Loader>

  setOptions: Item.Setter<Item.Module.Options>

  setQuery: Item.Setter<Item.Module.Query>

  make: () => Framework.Build.RuleSetLoader
}

declare namespace Item {
  export type Getter<T> = () => T

  export type Setter<T> = (prop: T) => void

  export type Product = {
    ident?: MaybeCallable<string>
    loader?: MaybeCallable<string>
    options?: MaybeCallable<Build.RuleSetLoader['options']>
    query?: MaybeCallable<Module.Query>
  }

  export type Factory<OutType> = (any) => OutType

  export type MaybeCallable<P> = Factory<P> | P

  export type Yield<P> = () => P

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
      Build.RuleSetLoader['options']
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
}
