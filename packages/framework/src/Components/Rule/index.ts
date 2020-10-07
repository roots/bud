import type Bud from '../../Bud'

/**
 * Build Rule
 *
 * @description
 *  Manufactures a RuleSet item.
 *
 * @class Rule
 */
class Rule {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   * @memberof Rule
   */
  public bud: Bud

  /**
   * Enforce rule as 'pre' or 'post'
   *
   * @type {Build.Rule.Enforce}
   */
  public enforce?: Build.Rule.Enforce

  /**
   * Exclude
   *
   * @type {Build.Rule.Conditional}
   */
  public exclude?: Build.Rule.Conditional

  /**
   * Include
   *
   * @type {Build.Rule.Conditional}
   */
  public include?: Build.Rule.Conditional

  /**
   * Issuer
   *
   * @type {Build.Rule.Conditional}
   */
  public issuer?: Build.Rule.Conditional

  /**
   * OneOf
   *
   * @type {Build.Rule.Conditional}
   */
  public oneOf?: Build.Rule.OneOf

  /**
   * Options
   *
   * @type {Build.Rule.Conditional}
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
  public sideEffects?: Build.Rule.Bool

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
   *
   * @type {Build.Rule.Conditional}
   */
  public compiler?: Build.Rule.Conditional

  /**
   * Rules
   *
   * @type {Build.Rule.Conditional}
   */
  public rules?: Build.Rule.OneOf

  /**
   * Test
   *
   * @type {Build.Rule.Conditional}
   */
  public test?: Build.Rule.Conditional

  /**
   * Use
   *
   * @type {Build.Rule.Conditional}
   */
  public use?: Build.Rule.Loader

  /**
   *Creates an instance of Rule.
   *
   * @param {Bud} bud
   * @param {Build.Rule.Generic} rule
   * @memberof Rule
   */
  constructor(bud: Bud, rule: Build.Rule.Generic) {
    this.bud = bud

    /**
     * If a property from the rule module which has been passed is a function,
     * we bind Bud to that function. This should make it maximally flexible for
     * extensions.
     */
    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })

    this.get.bind(this)
    this.make.bind(this)
  }

  /**
   * Get the rule definition
   *
   * @returns {Build.Rule.Product}
   * @memberof Rule
   */
  public get(): Build.Rule.Product {
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

  /**
   * Make the Rule (for builder).
   *
   * @returns {Build.Rule.Product}
   * @memberof Rule
   */
  public make(): Build.Rule.Product {
    /**
     * Out of all entries...
     */
    return (
      Object.entries(this.get())
        /** ...filter out the nully ones. */
        .filter(
          ([, value]) => value !== null && value !== undefined,
        )
        /** ...reduce the remaining down to a Webpack RuleSet item */
        .reduce(
          (
            fields: Build.Rule.Product,
            [key, value]: [
              string,
              Build.Rule.Factory<{this: Bud}> | unknown,
            ],
          ) =>
            /** ...provide a hook for extensions */
            this.bud.hooks.filter(`module.rule.uses.${key}`, {
              ...fields,
              [key]:
              /** And, finally, call any values which are callable. */
                typeof value == 'function' ? value() : value,
            }),
          {},
        )
    )
  }
}

export default Rule
