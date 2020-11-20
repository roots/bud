import Framework from '@roots/bud-typings'

export {Rule, Rule as default}

/**
 * Webpack RuleSet
 */
class Rule implements Framework.Rule.Contract {
  public bud: Framework.Bud.Ref

  public enforce?: Framework.Rule.Enforce

  public exclude?: Framework.Rule.Conditional

  public include?: Framework.Rule.Conditional

  public issuer?: Framework.Rule.Conditional

  public oneOf?: Framework.Rule.OneOf

  public options?: Framework.Rule.Options

  public parser?: Framework.Rule.Parser

  public resolve?: Framework.Rule.Resolve

  public sideEffects?: Framework.Rule.SideEffects

  public query?: Framework.Rule.Query

  public type?: Framework.Rule.Type

  public resource?: Framework.Rule.Conditional

  public resourceQuery?: Framework.Rule.Conditional

  public compiler?: Framework.Rule.Conditional

  public rules?: Framework.Rule.OneOf

  public test?: Framework.Rule.Conditional

  public use?: Framework.Rule.Use

  constructor(bud: Framework.Bud.Bud, rule?: unknown) {
    this.bud = bud.get

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

  public getProp<
    T = Framework.Rule.Property<Framework.Rule.Generic>
  >(prop: string): T {
    return this[prop]
  }

  public setProp<
    T = Framework.Rule.Property<Framework.Rule.Generic>
  >(prop: string, value: T): this {
    this[prop] = value
    return this
  }

  public get: () => Array<
    [string, Framework.Rule.Generic]
  > = function () {
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

  public make(): Framework.Webpack.RuleSetRule {
    return (
      this.get()

        /** ...filter out the nully values */
        .filter(
          ([, prop]: Framework.Rule.MakeIn) =>
            prop !== null && prop !== undefined,
        )

        /**
         * ...reduce the remaining down to a Webpack.RuleSetRule
         */
        .reduce(
          (
            accumulator: Framework.Webpack.RuleSetRule,
            [label, prop]: Framework.Rule.MakeIn,
          ) => ({
            ...accumulator,

            /**
             * Prop might be callable. If so, pass it the appropriate param(s).
             */
            [label]: this.bud().callMeMaybe(prop),
          }),
          {},
        )
    )
  }
}
