import type Webpack from 'webpack'
import webpack from 'webpack'

export {Rule}

/**
 * Manufactures a RuleSetRule
 *
 * @yields {Webpack.RuleSetRule}
 */
declare class Rule {
  /**
   * The Bud instance.
   */
  public bud: Framework.Bud

  /**
   * Enforce rule as 'pre' or 'post'
   */
  public enforce?: Build.Rule.Enforce

  /**
   * Exclude
   */
  public exclude?: Build.Rule.Conditional

  /**
   * Include
   */
  public include?: Build.Rule.Conditional

  /**
   * Issuer
   */
  public issuer?: Build.Rule.Conditional

  /**
   * OneOf
   */
  public oneOf?: Build.Rule.OneOf

  /**
   * Options
   */
  public options?: Build.Rule.Query

  /**
   * Options for parsing
   */
  public parser?: Build.Rule.Parser

  /**
   * Options for the resolver
   */
  public resolve?: Build.Rule.Resolve

  /**
   * Flags a module as with or without side effects
   */
  public sideEffects?: boolean

  /**
   * Shortcut for use.query
   */
  public query?: Build.Rule.Query

  /**
   * Module type to use for the module
   */
  public type?: Build.Rule.Type

  /**
   * Match the resource path of the module
   */
  public resource?: Build.Rule.Conditional

  /**
   * Match the resource query of the module
   */
  public resourceQuery?: Build.Rule.Conditional

  /**
   * Compiler
   */
  public compiler?: Build.Rule.Conditional

  /**
   * Rules
   */
  public rules?: Build.Rule.OneOf

  /**
   * Test
   */
  public test?: Build.Rule.Conditional

  /**
   * Use
   */
  public use?:
    | Webpack.RuleSetUseItem[]
    | Rule.Factory<Webpack.RuleSetUseItem[]>

  /**
   * Class constructor
   */
  constructor(bud: Framework.Bud, rule: Rule.Generic)

  /**
   * Get iterable
   */
  public get(): Rule.MakeSet

  /**
   * Produce rule product
   *
   * @see Webpack.RuleSetRule
   */
  public make(): Rule.Product

  /**
   * Register prop(s) on rule.
   */
  public register(rule: unknown): this

  /**
   * Set prop
   */
  setProp(
    prop: string,
    value: Build.Rule.Property<unknown>,
  ): this

  /**
   * Get prop
   */
  getProp(prop: string): Build.Rule.Property<unknown>
}

declare namespace Rule {
  export type Module = {
    [key: string]: Framework.MaybeCallable<Build.Rule.Products>
  }

  /**
   * A tuple to be processed by make
   */
  export type MakeIn = [
    string,
    [unknown, Framework.Index<unknown>],
  ]

  /**
   * An array of inputs (for Framework.Rule['get'])
   */
  export type MakeSet = Array<MakeIn>

  /**
   * The most generic representation of a rule module.
   * Used for typecheck on constructor, get.
   */
  export type Generic = Property<Products>

  /**
   * Rule modules produce Webpack.RuleSetRule entries
   */
  export type Makes = Webpack.RuleSetRule

  /**
   * Rule modules can also be manipulated as keyed items.
   */
  export interface Property<Product> {
    [key: string]: Factory<Product> | Product
  }

  /**
   * Rule property defined with a callable.
   */
  export interface Factory<Product> {
    (unknown): Product
  }

  /**
   * Rule modules produce Webpack.RuleSetRule entries
   */
  export type Product = Webpack.RuleSetRule

  /**
   * All possible final products
   */
  export type Products =
    | string
    | boolean
    | Type
    | Enforce
    | Conditional
    | Parser
    | Query
    | Resolve
    | Use
    | OneOf

  /**
   * Product: Module type to use
   */
  export type Type = Webpack.RuleSetRule['type']

  /**
   * Product: Enforce this rule as pre or post step
   */
  export type Enforce = Webpack.RuleSetRule['enforce']

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
  export type Use = Webpack.RuleSetRule['use']

  /**
   * Product: Multiple child rules.
   */
  export type OneOf = Webpack.RuleSetRule
}
