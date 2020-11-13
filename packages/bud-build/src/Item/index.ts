import {Bud} from '@roots/bud-typings'
import type Webpack from 'webpack'
import {Build} from '../Build'

export {Item, Item as default}

class Item implements Item.Contract {
  bud: Bud.Contract
  ident?: Item.Contract['ident']
  loader?: Item.Contract['loader']
  options?: Item.Contract['options']
  query?: Item.Contract['query']

  constructor(bud: Bud.Contract, module: Item.Module) {
    this.bud = bud

    this.set(module)

    this.set = this.set.bind(this)
    this.make = this.make.bind(this)
  }

  /**
   * Prop map
   */
  public propMap: Item.Contract['propMap'] = function () {
    return {
      ident: [this.ident, this.bud],
      query: [this.query, this.bud],
      loader: [this.loader, this.bud.build.loaders],
      options: [this.options, this.bud],
    }
  }

  /**
   * Set the loader definition
   */
  public set: Item.Contract['set'] = function (
    module: Item.Module,
  ): void {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Get the loader ident
   */
  public getIdent: Item.Contract['getIdent'] = function () {
    return this.ident
  }

  /**
   * Set the loader ident
   */
  public setIdent: Item.Contract['setIdent'] = function (
    ident: Item.Module.Ident,
  ): void {
    this.ident = ident
  }

  /**
   * Get the loader ident
   */
  public getOptions: Item.Contract['getOptions'] = function () {
    return this.options
  }

  /**
   * Set the loader options
   */
  public setOptions: Item.Contract['setOptions'] = function (
    options: Item.Module.Options,
  ): void {
    this.options = options
  }

  /**
   * Get the loader ident
   */
  public getQuery: Item.Contract['getQuery'] = function () {
    return typeof this.query == 'function'
      ? this.query()
      : this.query
  }

  /**
   * Set the loader query
   */
  public setQuery: Item.Contract['setQuery'] = function (
    query: Item.Module.Query,
  ): void {
    this.query = query
  }

  /**
   * Get the loader ident
   */
  public getLoader: Item.Contract['getLoader'] = function () {
    return this.loader
  }

  /**
   * Set the loader
   */
  public setLoader: Item.Contract['setLoader'] = function (
    loader: Item.Module.Loader,
  ): void {
    this.loader = loader
  }

  /**
   * Make an item for use in a rule.
   */
  public make: Item.Contract['make'] = function (
    this: Item.Contract,
  ) {
    return (
      // Get the map of props to items
      Object.entries(this.propMap())
        // First out nullish values, etc.
        .filter(
          ([, [value]]: [string, [Item.Property, unknown]]) =>
            value !== null && value !== undefined,
        )
        // Then, reduce the set, tapping callables during translation
        .reduce(
          (
            fields: Framework.Build.RuleSetLoader,
            [property, [value, param]]: [
              string,
              [Item.MaybeCallable<Item.Property>, unknown],
            ],
          ): Framework.Build.RuleSetLoader => {
            /**
             * A property value can be calculated
             * in a couple different ways.
             */
            const computed =
              // For loaders which are specified as a string
              property == 'loader' && typeof value == 'string'
                ? // Set the loader from that string
                  this.bud.build.getLoader(value)
                : // Otherwise, for functions
                typeof value == 'function'
                ? // Call them with the param from this.propMap
                  value(param)
                : // Else, just use the given value
                  value

            return {
              ...fields,
              [property]: computed,
            }
          },
          {},
        )
    )
  }
}

namespace Item {
  export class Contract {
    bud: Bud.Contract

    ident?: Item.Module.Ident

    loader?: Item.Module.Loader

    options?: Item.Module.Options

    query?: Item.Module.Query

    propMap: () => Framework.Index<
      [Item.Property, Framework.Index<string> | Bud.Contract]
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
