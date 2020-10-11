import type Webpack from 'webpack'

export {Item}

declare class Item {
  bud: Framework.Bud

  ident?: Item.MaybeCallable<Item.Module.Ident>

  loader?: Item.MaybeCallable<Item.Module.Loader>

  options?: Item.MaybeCallable<Item.Module.Options>

  query?: Item.MaybeCallable<Item.Module.Query>

  propMap: () => Framework.Index<
    [Build.Item.Property, Framework.Store | Framework.Bud]
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

  make: Item.Yield<Item.Product>
}

declare namespace Item {
  export type Getter<T> = () => T

  export type Setter<T> = (prop: T) => void

  export type Product = Webpack.RuleSetLoader

  export type Factory<OutType> = (any) => OutType

  export type MaybeCallable<Product> = Factory<Product> | Product

  export type Yield<Product> = () => Product

  export type Module = {
    ident?: MaybeCallable<Module.Ident>
    loader?: MaybeCallable<Module.Loader>
    options?: MaybeCallable<Module.Options>
    query?: MaybeCallable<Module.Query>
  }

  export type Untapped = MaybeCallable<Property>

  export type Property =
    | Webpack.RuleSetLoader['ident']
    | Webpack.RuleSetLoader['loader']
    | Webpack.RuleSetLoader['options']
    | Webpack.RuleSetLoader['query']

  export namespace Module {
    export type Ident = Webpack.RuleSetLoader['ident']
    export type Loader = Webpack.RuleSetLoader['loader']
    export type Options = Webpack.RuleSetLoader['options']
    export type Query = Webpack.RuleSetLoader['query']
  }

  export type PropertyTuple = [string, MaybeCallable<Property>]

  export type Valid = Omit<Untapped, undefined | null>[]
}
