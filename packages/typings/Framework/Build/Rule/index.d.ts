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
  public use?: Build.Rule.Use

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
   * Set property on rule
   */
  setProp(prop: string, value: Build.Rule.Property<any>): this

  /**
   * Get prop
   */
  getProp(prop: string): Build.Rule.Property<any>
}

declare namespace Rule {
  /**
   * A modular rule implementation
   */
  export type Module = {
    [key: string]: Framework.MaybeCallable<Build.Rule.Products>
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

  export type Product = Webpack.RuleSetRule

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

  export type Conditional = Webpack.RuleSetCondition

  export type Parser = Framework.Index<any>

  export type Query = string | Parser

  export type Resolve = Webpack.Resolve

  export type Use =
    | Webpack.RuleSetUseItem[]
    | Rule.Factory<Webpack.RuleSetUseItem[]>

  export type OneOf = Webpack.RuleSetRule
}
