import Base from './Item'
import Contract from './Contract'
import {
  Index,
  Framework,
  MaybeCallable,
  Webpack,
} from '@roots/bud-typings'

/**
 * Webpack RuleSetUseItem
 */
class Item extends Base implements Contract {
  public constructor(bud: Framework, module: Item.Module) {
    super(bud)

    this.set = this.set.bind(this)
    this.make = this.make.bind(this)

    this.set(module)
  }

  public propMap: Item.PropMap = function () {
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
  public set: Item.Setter<Item.Module> = function (module) {
    Object.entries(module).map(([key, item]) => {
      this[key] = item
    })
  }

  /**
   * Get the loader ident
   */
  public getIdent: Item.Getter<Item.Module.Ident> = function () {
    return this.ident
  }

  /**
   * Set the loader ident
   */
  public setIdent: Item.Setter<Item.Module.Ident> = function (
    ident,
  ) {
    this.ident = ident
  }

  /**
   * Get the loader ident
   */
  public getOptions: Item.Getter<
    Item.Module.Options
  > = function () {
    return this.options
  }

  /**
   * Set the loader options
   */
  public setOptions: Item.Setter<
    Item.Module.Options
  > = function (options): void {
    this.options = options
  }

  /**
   * Get the loader ident
   */
  public getQuery = function (): Item['query'] {
    return typeof this.query == 'function'
      ? this.query()
      : this.query
  }

  /**
   * Set the loader query
   */
  public setQuery: Item.Setter<Item.Module.Query> = function (
    query,
  ) {
    this.query = query
  }

  /**
   * Get the loader ident
   */
  public getLoader: Item.Getter<
    Item.Module.Loader
  > = function () {
    return this.loader
  }

  /**
   * Set the loader
   */
  public setLoader: Item.Setter<Item.Module.Loader> = function (
    loader,
  ): void {
    this.loader = loader
  }

  /**
   * Make an item for use in a rule.
   */
  public make: () => Item.RuleSetLoader = function () {
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
            fields: Item.RuleSetLoader,
            [property, [value, param]]: [
              string,
              [MaybeCallable<Item.Property>, unknown],
            ],
          ): Item.RuleSetLoader => {
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

declare namespace Item {
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

  export type PropMap = () => Index<
    [Item.Property, Index<string> | Framework]
  >

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
}

export default Item
