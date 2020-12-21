import {Framework, Index, Webpack} from '@roots/bud-typings'
import Rule from '.'

export default abstract class {
  public _bud: Framework.Ref

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
   * Class constructor.
   */
  public constructor(bud: Framework) {
    this._bud = bud.get
  }

  public get bud(): Framework {
    return this._bud()
  }

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given
   */
  public abstract get: () => Array<[string, Rule.Generic]>

  /**
   * Produce rule product
   *
   * @see RuleSetRule
   */
  public abstract make(): Webpack.RuleSetRule

  /**
   * Register prop(s) on
   */
  public abstract register(rule: any): this

  /**
   * Set property on rule
   */
  public abstract setProp(
    prop: string,
    value: Rule.Property<any>,
  ): this

  /**
   * Get prop
   */
  public abstract getProp(prop: string): Rule.Property<any>
}
