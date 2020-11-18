import {
  Bud,
  MaybeCallable,
  Index,
  Item,
  Factory,
  Webpack,
} from '.'

export class Contract {
  /**
   * The Bud instance.
   */
  public bud: Bud.Ref

  /**
   * Enforce rule as 'pre' or 'post'
   */
  public enforce?: Enforce

  /**
   * Exclude
   */
  public exclude?: Conditional

  /**
   * Include
   */
  public include?: Conditional

  /**
   * Issuer
   */
  public issuer?: Conditional

  /**
   * OneOf
   */
  public oneOf?: OneOf

  /**
   * Options
   */
  public options?: {[key: string]: any}

  /**
   * Options for parsing
   */
  public parser?: Parser

  /**
   * Options for the resolver
   */
  public resolve?: Resolve

  /**
   * Flags a module as with or without side effects
   */
  public sideEffects?: SideEffects

  /**
   * Shortcut for use.query
   */
  public query?: Query

  /**
   * Module type to use for the module
   */
  public type?: Type

  /**
   * Match the resource path of the module
   */
  public resource?: Conditional

  /**
   * Match the resource query of the module
   */
  public resourceQuery?: Conditional

  /**
   * Compiler
   */
  public compiler?: Conditional

  /**
   * Rules
   */
  public rules?: OneOf

  /**
   * Test
   */
  public test?: Conditional

  /**
   * Use
   */
  public use?: Array<{[key: string]: any}>

  /**
   * Class constructor
   */
  constructor(bud: Bud.Contract, rule: Generic)

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given
   */
  public get: () => Array<[string, Generic]>

  /**
   * Produce rule product
   *
   * @see RuleSetRule
   */
  public make(): Webpack.RuleSetRule

  /**
   * Register prop(s) on
   */
  public register(rule: any): this

  /**
   * Set property on rule
   */
  setProp(prop: string, value: Property<any>): this

  /**
   * Get prop
   */
  getProp(prop: string): Property<any>
}

/**
 * A modular rule implementation
 */
export type Module = {
  /**
   * Enforce rule as 'pre' or 'post'
   */
  enforce?: MaybeCallable<Enforce>

  /**
   * Exclude
   */
  exclude?: MaybeCallable<Conditional>

  /**
   * Include
   */
  include?: MaybeCallable<Conditional>

  /**
   * Issuer
   */
  issuer?: MaybeCallable<Conditional>

  /**
   * OneOf
   */
  oneOf?: MaybeCallable<OneOf>

  /**
   * Options
   */
  options?: MaybeCallable<{[key: string]: any}>

  /**
   * Options for parsing
   */
  parser?: MaybeCallable<Parser>

  /**
   * Options for the resolver
   */
  resolve?: MaybeCallable<Resolve>

  /**
   * Flags a module as with or without side effects
   */
  sideEffects?: MaybeCallable<SideEffects>

  /**
   * Shortcut for use.query
   */
  query?: MaybeCallable<Query>

  /**
   * Module type to use for the module
   */
  type?: MaybeCallable<Type>

  /**
   * Match the resource path of the module
   */
  resource?: MaybeCallable<Conditional>

  /**
   * Match the resource query of the module
   */
  resourceQuery?: MaybeCallable<Conditional>

  /**
   * Compiler
   */
  compiler?: MaybeCallable<Conditional>

  /**
   * Rules
   */
  rules?: MaybeCallable<OneOf>

  /**
   * Test
   */
  test?: MaybeCallable<Conditional>

  /**
   * Use
   */
  use?: MaybeCallable<Array<{[key: string]: any}>>
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
 *  - Parameters to pass to callables in a given
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
export type Makes = Webpack.RuleSetRule

/**
 * Rule modules can also be manipulated as keyed items.
 */
export interface Property<Product> {
  [key: string]: Factory<Product> | Product
}

/**
 * Builds webpack's resolve configuration.
 */
export type Resolve = (
  args?: Index<any>,
) => Index<Webpack.Resolve>

/**
 * Product
 */
export type Product = Array<Item.Contract>

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
export type Conditional = Webpack.RuleSetCondition

/**
 * Parser
 */
export type Parser = {[key: string]: any}

/**
 * Query
 */
export type Query = string | Parser

/**
 * SideEffects
 */
export type SideEffects = boolean

/**
 * Options
 */
export type Options = {[key: string]: any}

/**
 * OneOf
 */
export type OneOf = MaybeCallable<Array<Webpack.RuleSetRule>>

/**
 * Use
 */
export type Use = Array<{[key: string]: any}>
