import type Webpack from 'webpack'

/**
 * Manufactures a RuleSetRule
 *
 * @yields {Webpack.RuleSetRule}
 */
export declare class Rule {
  /**
   * The Bud instance.
   */
  public bud: Framework.Bud

  /**
   * Enforce rule as 'pre' or 'post'
   */
  public enforce?: Rule.Enforce

  /**
   * Exclude
   */
  public exclude?: Rule.Conditional

  /**
   * Include
   */
  public include?: Rule.Conditional

  /**
   * Issuer
   */
  public issuer?: Rule.Conditional

  /**
   * OneOf
   */
  public oneOf?: Rule.OneOf

  /**
   * Options
   */
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
  public sideEffects?: boolean

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

  /**
   * Compiler
   */
  public compiler?: Rule.Conditional

  /**
   * Rules
   */
  public rules?: Rule.OneOf

  /**
   * Test
   */
  public test?: Rule.Conditional

  /**
   * Use
   */
  public use?: Rule.Use

  /**
   * Class constructor
   */
  constructor(bud: Framework.Bud, rule: Rule.Generic)

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given rule.
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
   * Set property on rule
   */
  setProp(prop: string, value: Rule.Property<any>): this

  /**
   * Get prop
   */
  getProp(prop: string): Rule.Property<any>
}

declare namespace Rule {
  /**
   * A modular rule implementation
   */
  export type Module = {
    [key: string]: Framework.MaybeCallable<Rule.Products>
  }

  /**
   * A tuple to be processed by make
   */
  export type MakeIn = [string, Framework.MaybeCallable<unknown>]

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given rule.
   */
  export type MakeSet = MakeIn[]

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

  export interface Factory<Product> {
    (unknown): Product
  }

  export type Product = Framework.Webpack.RuleSetRule

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

  export type Type =
    | 'javascript/auto'
    | 'javascript/dynamic'
    | 'javascript/esm'
    | 'json'
    | 'webassembly/experimental'

  export type Enforce = 'pre' | 'post'

  export type Conditional = Framework.Webpack.RuleSetCondition

  export type Parser = Framework.Index<any>

  export type Query = string | Parser

  export type Resolve = Framework.Webpack.Resolve

  export type Use =
    | Framework.Webpack.RuleSetUseItem[]
    | Rule.Factory<Framework.Webpack.RuleSetUseItem[]>

  export type OneOf = Framework.Webpack.RuleSetRule
}
