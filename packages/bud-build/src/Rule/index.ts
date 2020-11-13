import {Bud, MaybeCallable} from '@roots/bud-typings'
import type {
  RuleSetRule,
  RuleSetCondition,
  Resolve,
} from 'webpack'
import {Item} from '../Item'

export {Rule, Rule as default}

class Rule implements Rule.Contract {
  public bud: Bud.Contract

  public enforce?: Rule.Enforce
  public exclude?: Rule.Conditional
  public include?: Rule.Conditional
  public issuer?: Rule.Conditional
  public oneOf?: Rule.OneOf
  public options?: Rule.Options
  public parser?: Rule.Parser
  public resolve?: Rule.Resolve
  public sideEffects?: Rule.SideEffects
  public query?: Rule.Query
  public type?: Rule.Type
  public resource?: Rule.Conditional
  public resourceQuery?: Rule.Conditional
  public compiler?: Rule.Conditional
  public rules?: Rule.OneOf
  public test?: Rule.Conditional
  public use?: Rule.Use

  constructor(bud: Bud.Contract, rule?: unknown) {
    this.bud = bud

    this.register = this.register.bind(this)
    this.getProp = this.getProp.bind(this)
    this.setProp = this.setProp.bind(this)
    this.get = this.get.bind(this)
    this.make = this.make.bind(this)

    rule && this.register(rule)
  }

  public register(rule: unknown): this {
    Object.entries(rule).map(([prop, source]) => {
      this.setProp(prop, source)
    })

    return this
  }

  public getProp(prop: string): Rule.Property<Rule.Generic> {
    return this[prop]
  }

  public setProp(
    prop: string,
    value: Rule.Property<Rule.Generic>,
  ): this {
    this[prop] = value
    return this
  }

  public get: () => Array<[string, Rule.Generic]> = function () {
    return Object.entries({
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
    })
  }

  public make(): RuleSetRule {
    return (
      this.get()

        /** ...filter out the nully values */
        .filter(
          ([, prop]: Rule.MakeIn) =>
            prop !== null && prop !== undefined,
        )

        /**
         * ...reduce the remaining down to a Webpack RuleSetRule
         */
        .reduce(
          (
            accumulator: RuleSetRule,
            [label, prop]: Rule.MakeIn,
          ) => ({
            ...accumulator,

            /**
             * Prop might be callable. If so, pass it the appropriate param(s).
             */
            [label]:
              typeof prop == 'function' ? prop(this.bud) : prop,
          }),
          {},
        )
    )
  }
}

declare namespace Rule {
  export class Contract {
    /**
     * The Bud instance.
     */
    public bud: Bud.Contract

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
    public options?: {[key: string]: any}

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
    public use?: Array<{[key: string]: any}>

    /**
     * Class constructor
     */
    constructor(bud: Bud.Contract, rule: Rule.Generic)

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
  export type Parser = {[key: string]: any}

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
  export type Options = {[key: string]: any}

  /**
   * OneOf
   */
  export type OneOf = MaybeCallable<Array<RuleSetRule>>

  /**
   * Use
   */
  export type Use = Array<{[key: string]: any}>
}
