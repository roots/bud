import type Bud from '../../Bud'

class Rule {
  public bud: Bud

  public enforce?: Bud.Build.Rule.Enforce

  public exclude?: Bud.Build.Rule.Conditional

  public include?: Bud.Build.Rule.Conditional

  public issuer?: Bud.Build.Rule.Conditional

  public oneOf?: Bud.Build.Rule.OneOf

  public options?: Bud.Build.Rule.Query

  /**
   * Options for parsing
   */
  public parser?: Bud.Build.Rule.Parser

  /**
   * Options for the resolver
   */
  public resolve?: Bud.Build.Rule.Resolve

  /**
   * Flags a module as with or without side effects
   */
  public sideEffects?: Bud.Build.Rule.Bool

  /**
   * Shortcut for use.query
   */
  public query?: Bud.Build.Rule.Query

  /**
   * Module type to use for the module
   */
  public type?: Bud.Build.Rule.Type

  /**
   * Match the resource path of the module
   */
  public resource?: Bud.Build.Rule.Conditional

  /**
   * Match the resource query of the module
   */
  public resourceQuery?: Bud.Build.Rule.Conditional
  public compiler?: Bud.Build.Rule.Conditional
  public rules?: Bud.Build.Rule.OneOf
  public test?: Bud.Build.Rule.Conditional
  public use?: Bud.Build.Rule.Loader

  constructor(bud: Bud, rule: Bud.Build.Rule.Generic) {
    this.bud = bud

    Object.entries(rule).map(([key, item]) => {
      this[key] =
        typeof item == 'function' ? item.bind(this.bud) : item
    })

    this.get.bind(this)
    this.make.bind(this)
  }

  public get(): Bud.Build.Rule.Product {
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

  public make(): Bud.Build.Rule.Product {
    /**
     * Out of all entries, filter out the nullish/undefined values
     * and call the functional ones.
     */
    return Object.entries(this.get())
      .filter(
        ([, value]) => value !== null && value !== undefined,
      )
      .reduce(
        (
          fields: Bud.Build.Rule.Product,
          [key, value]: [
            string,
            Bud.Build.Rule.Factory<{this: Bud}> | unknown,
          ],
        ) =>
          this.bud.hooks.filter(`module.rule.uses.${key}`, {
            ...fields,
            [key]: typeof value == 'function' ? value() : value,
          }),
        {},
      )
  }
}

export default Rule
