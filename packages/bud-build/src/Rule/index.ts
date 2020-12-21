import Base from './Rule'
import Contract from './Contract'
import Item from '../Item'
import {
  Factory,
  Framework,
  Index,
  MaybeCallable,
  Webpack,
} from '@roots/bud-typings'

class Rule extends Base implements Contract {
  constructor(bud: Framework, rule?: unknown) {
    super(bud)

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

  public getProp<T = Rule.Property<Rule.Generic>>(
    prop: string,
  ): T {
    return this[prop]
  }

  public setProp<T = Rule.Property<Rule.Generic>>(
    prop: string,
    value: T,
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

  public make(): Webpack.RuleSetRule {
    return (
      this.get()

        /** ...filter out the nully values */
        .filter(
          ([, prop]: Rule.MakeIn) =>
            prop !== null && prop !== undefined,
        )

        /**
         * ...reduce the remaining down to a Webpack.RuleSetRule
         */
        .reduce(
          (
            accumulator: Webpack.RuleSetRule,
            [label, prop]: Rule.MakeIn,
          ) => ({
            ...accumulator,

            /**
             * Prop might be callable. If so, pass it the appropriate param(s).
             */
            [label]: this.bud.callMeMaybe(prop),
          }),
          {},
        )
    )
  }
}

namespace Rule {
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
    use?: MaybeCallable<Array<Index<any>>>
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
  export type Conditional = Webpack.RuleSetCondition

  /**
   * Parser
   */
  export type Parser = Index<any>

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
  export type Options = Index<any>

  /**
   * OneOf
   */
  export type OneOf = MaybeCallable<Array<Webpack.RuleSetRule>>

  /**
   * Use
   */
  export type Use = Array<Index<any>>
}

export default Rule
