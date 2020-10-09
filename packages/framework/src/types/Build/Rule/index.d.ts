import type Bud from '../../../Bud'
import type Webpack from 'webpack'

export {Rule}

declare class Rule {
  public bud: Bud

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
  public use?: Rule.Use

  constructor(bud: Bud, rule: Rule.Generic)

  public get(): Rule.Product

  public make(): Rule.Product
}

declare namespace Rule {
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
    (unknown): Products
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
    | Use
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
  export type Use = Webpack.RuleSetUse

  /**
   * Product: Multiple child rules.
   */
  export type OneOf = Webpack.RuleSetRule[]
}
