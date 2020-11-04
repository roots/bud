import type {
  RuleSetRule,
  RuleSetCondition,
  Resolve,
} from 'webpack'
import type {Bud, Index, Item, MaybeCallable} from '../'

/**
 * Manufactures a RuleSetRule
 *
 * @yields {Webpack.RuleSetRule}
 */
export declare class Rule {
  /**
   * The Bud instance.
   */
  public bud: Bud

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
  public options?: Index<any>

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
  public sideEffects?: Rule.SideEffects

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
  public use?: Array<Index<any>>

  /**
   * Class constructor
   */
  constructor(bud: Bud, rule: Rule.Generic)

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given rule.
   */
  public get: () => Array<[string, Rule.Generic]>

  /**
   * Produce rule product
   *
   * @see RuleSetRule
   */
  public make(): RuleSetRule

  /**
   * Register prop(s) on rule.
   */
  public register(rule: any): this

  /**
   * Set property on rule
   */
  setProp(prop: string, value: Rule.Property<any>): this

  /**
   * Get prop
   */
  getProp(prop: string): Rule.Property<any>
}

export declare namespace Rule {
  /**
   * A modular rule implementation
   */
  export type Module = {
    [key: string]: MaybeCallable<Rule.Products>
  }

  /**
   * A tuple to be processed by make
   */
  export type MakeIn = [string, MaybeCallable<any>]

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
   * Rule modules produce RuleSetRule entries
   */
  export type Makes = RuleSetRule

  /**
   * Rule modules can also be manipulated as keyed items.
   */
  export interface Property<Product> {
    [key: string]: Factory<Product> | Product
  }

  /**
   * Factory
   */
  export interface Factory<Product> {
    (arguments?: any): Product
  }

  /**
   * Product
   */
  export type Product = Array<Item>

  /**
   * Products
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
   * Type
   */
  export type Type =
    | 'javascript/auto'
    | 'javascript/dynamic'
    | 'javascript/esm'
    | 'json'
    | 'webassembly/experimental'

  /**
   * Enforce
   */
  export type Enforce = 'pre' | 'post'

  /**
   * Conditional
   */
  export type Conditional = RuleSetCondition

  /**
   * Parser
   */
  export type Parser = Index<any>

  /**
   * Query
   */
  export type Query = string | Parser

  /**
   * Resolve
   */
  export type {Resolve}

  /**
   * SideEffects
   */
  export type SideEffects = boolean

  /**
   * Options
   */
  export type Options = Index<any>

  /**
   * OneOf
   */
  export type OneOf = MaybeCallable<Array<RuleSetRule>>

  /**
   * Use
   */
  export type Use = Array<{[key: string]: any}>
}
