/**
 * Manufactures a RuleSetRule
 *
 * @typedef {Build.Rule.Rule}
 * @yields {Webpack.RuleSetRule}
 */
export class Rule implements Build.Rule {
  public bud: Framework.Bud
  public enforce?: Build.Rule.Enforce
  public exclude?: Build.Rule.Conditional
  public include?: Build.Rule.Conditional
  public issuer?: Build.Rule.Conditional
  public oneOf?: Build.Rule.OneOf
  public options?: Build.Rule.Query
  public parser?: Build.Rule.Parser
  public resolve?: Build.Rule.Resolve
  public sideEffects?: boolean
  public query?: Build.Rule.Query
  public type?: Build.Rule.Type
  public resource?: Build.Rule.Conditional
  public resourceQuery?: Build.Rule.Conditional
  public compiler?: Build.Rule.Conditional
  public rules?: Build.Rule.OneOf
  public test?: Build.Rule.Conditional
  public use?: Build.Rule.Use

  constructor(bud: Framework.Bud, rule?: unknown) {
    this.bud = bud

    this.register = this.register.bind(this)
    this.getProp = this.getProp.bind(this)
    this.setProp = this.setProp.bind(this)
    this.get = this.get.bind(this)
    this.make = this.make.bind(this)

    rule && this.register(rule)
  }

  /**
   * Map to class props.
   */
  public register(rule: unknown): this {
    Object.entries(rule).map(([prop, source]) => {
      this.setProp(prop, source)
    })

    return this
  }

  public getProp(
    prop: string,
  ): Build.Rule.Property<Build.Rule.Generic> {
    return this[prop]
  }

  public setProp(
    prop: string,
    value: Build.Rule.Property<Build.Rule.Generic>,
  ): this {
    this[prop] = value
    return this
  }

  /**
   * Rule as iterable tuples.
   *
   * Yields:
   *  - label
   *  - RuleSetRule property,
   *  - Parameters to pass to callables in a given rule.
   */
  public get(): Build.Rule.MakeSet {
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

  public make(): Build.Rule.Product {
    return (
      this.get()

        /** ...filter out the nully ones. */
        .filter(
          ([, prop]: Build.Rule.MakeIn) =>
            prop !== null && prop !== undefined,
        )

        /**
         * ...reduce the remaining down to a Webpack RuleSetRule
         */
        .reduce(
          (
            accumulator: Build.Rule.Product,
            [label, prop]: Build.Rule.MakeIn,
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
