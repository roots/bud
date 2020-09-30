import Bud from '@roots/bud-types'

export default class {
  /**
   * The Bud instance.
   */
  public bud: Bud

  /**
   * Enforce this rule as pre or post step
   */
  public enforce?: Bud.Rule.Enforce

  /**
   * Shortcut for resource.exclude
   */
  public exclude?: Bud.Rule.Conditional

  /**
   * Shortcut for resource.include
   */
  public include?: Bud.Rule.Conditional

  /**
   * Match the issuer of the module (The module pointing to this module)
   */
  public issuer?: Bud.Rule.Conditional

  /**
   * Only execute the first matching rule in this array
   */
  public oneOf?: Bud.Rule.OneOf

  /**
   * Shortcut for use.options
   */
  public options?: Bud.Rule.Query

  /**
   * Options for parsing
   */
  public parser?: Bud.Rule.Parser

  /**
   * Options for the resolver
   */
  public resolve?: Bud.Rule.Resolve

  /**
   * Flags a module as with or without side effects
   */
  public sideEffects?: Bud.Rule.Bool

  /**
   * Shortcut for use.query
   */
  public query?: Bud.Rule.Query

  /**
   * Module type to use for the module
   */
  public type?: Bud.Rule.Type

  /**
   * Match the resource path of the module
   */
  public resource?: Bud.Rule.Conditional

  /**
   * Match the resource query of the module
   */
  public resourceQuery?: Bud.Rule.Conditional

  /**
   * Match the child compiler name
   */
  public compiler?: Bud.Rule.Conditional

  /**
   * Match and execute these rules when this rule is matched
   */
  public rules?: Bud.Rule.OneOf

  /**
   * Shortcut for resource.test
   */
  public test?: Bud.Rule.Conditional

  /**
   * Modifiers applied to the module when rule is matched
   */
  public use?: Bud.Rule.Loader

  constructor(bud: Bud, rule: Bud.Rule.Generic) {
    this.bud = bud

    Object.entries(rule).forEach(([property, value]) => {
      Object.assign(this, property, value)

      if (typeof this[property] == 'function') {
        Object.assign(this, property, this[property].bind(this))
      }
    })

    this.get.bind(this)
  }

  public get(): Bud.Rule.Generic {
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

  public set(rule: Bud.Rule.Generic): void {
    Object.assign(this, rule)
  }

  public make(): Bud.Rule.Makes {
    return Object.entries(this.get()).reduce(
      (properties, [prop, val]: [string, unknown]) => ({
        ...properties,
        [prop]:
          typeof val !== 'undefined' &&
          typeof val == 'function' &&
          val.hasOwnProperty('bind')
            ? val.bind(this)()
            : val,
      }),
      {},
    )
  }
}
