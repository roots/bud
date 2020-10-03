import * as Webpack from 'webpack'

class Rule {
  public bud: App

  public enforce?: Rule.Enforce

  public exclude?: Rule.Conditional

  public include?: Rule.Conditional

  public issuer?: Rule.Conditional

  public oneOf?: Rule.OneOf

  public options?: Rule.Query

  /**
   * Options for parsing
   */
  public parser?: Rule.Parser

  /**
   * Options for the resolver
   */
  public resolve?: Rule.Resolve

  /**
   * Flags a module as with or without side effects
   */
  public sideEffects?: Rule.Bool

  /**
   * Shortcut for use.query
   */
  public query?: Rule.Query

  /**
   * Module type to use for the module
   */
  public type?: Rule.Type

  /**
   * Match the resource path of the module
   */
  public resource?: Rule.Conditional

  /**
   * Match the resource query of the module
   */
  public resourceQuery?: Rule.Conditional
  public compiler?: Rule.Conditional
  public rules?: Rule.OneOf
  public test?: Rule.Conditional
  public use?: Rule.Loader

  constructor(bud: App, rule: Rule.Generic) {
    this.bud = bud

    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })

    this.get.bind(this)
    this.make.bind(this)
  }

  public get(): Rule.Product {
    return {
      enforce: this.enforce,
      exclude: this.exclude,
      include: this.include,
      issuer: this.issuer,
      oneOf: this.oneOf,
      options: this.options,
      parser: this.parser,
      sideEffects: this.sideEffects,
      query: this.query,
      compiler: this.compiler,
      rules: this.rules,
      test: this.test,
      use: this.use,
    }
  }

  public make(): Rule.Product {
    /**
     * Out of all entries, filter out the nullish/undefined values
     * and call the functional ones.
     */
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Rule.Product,
          [key, value]: [
            string,
            Rule.Factory<{this: App}> | unknown,
          ],
        ) => ({
          ...fields,
          [key]: typeof value == 'function' ? value() : value,
        }),
        {},
      )
  }
}

declare type App = any

declare namespace Rule {
  /**
   * The most generic representation of a rule module.
   * Used for typecheck on constructor, get.
   */
  export type Generic = Property<Products> | Property<Products>[]

  /**
   * Rule modules produce Webpack.RuleSetRule entries
   */
  export type Makes = Webpack.RuleSetRule

  /**
   * Rule modules can also be manipulated as keyed items.
   */
  export interface Property<Product> {
    [key: string]: Yield<Product>
  }

  /**
   * Rule properties can be defined as callable functions or as literal values.
   */
  export type Yield<Product> = Factory<Product> | Product

  /**
   * Rule property defined with a callable.
   */
  export interface Factory<Product> {
    (this: App): Product
  }

  /**
   * Rule modules produce Webpack.RuleSetRule entries
   */
  export type Product = Webpack.RuleSetRule

  /**
   * All possible final products
   */
  export type Products =
    | Webpack.RuleSetUse
    | Type
    | Enforce
    | Bool
    | Conditional
    | Parser
    | Query
    | Resolve
    | Loader
    | OneOf
    | Webpack.RuleSetLoader
    | Webpack.RuleSetLoader[]
    | Webpack.RuleSetUse
    | string

  /**
   * Product: String literal
   */
  export type String = string

  /**
   * Product: Module type to use
   */
  export type Type = Webpack.RuleSetRule['type']

  /**
   * Product: Enforce this rule as pre or post step
   */
  export type Enforce = Webpack.RuleSetRule['enforce']

  /**
   * Product: Boolean literal
   */
  export type Bool = boolean

  /**
   * Product: Boolean test
   */
  export type Conditional = Webpack.RuleSetCondition

  /**
   * Product: Options for parsing
   */
  export type Parser = Webpack.RuleSetRule['parser']

  /**
   * Product: Use query
   */
  export type Query = string | Parser

  /**
   * Product: webpack resolve (multi-compiler)
   */
  export type Resolve = Webpack.Resolve

  /**
   * Product: loader(s)
   */
  export type Loader =
    | Webpack.RuleSetLoader
    | Webpack.RuleSetLoader[]
    | Webpack.RuleSetUse

  /**
   * Product: Multiple child rules.
   */
  export type OneOf = Webpack.RuleSetRule[]
}

export default Rule
