import {
  Factory,
  Framework,
  Item,
  Maybe,
  Rule as Base,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {isFunction} = lodash

/**
 * Framework Rule
 *
 * @public
 */
export default class Rule
  extends Base.Abstract
  implements Base.Interface
{
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
   *
   * @public
   */
  public test: Factory<[Framework], RegExp>

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use: Factory<[Framework], Item.Interface[]>

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude: Factory<[Framework], RegExp>

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type: Factory<[Framework], string>

  /**
   * Generator factory
   *
   * @public
   */
  public parser: Factory<[Framework], Base.Parser>

  /**
   * Generator factory
   *
   * @public
   */
  public generator: Factory<[Framework], any>

  /**
   * Class constructor
   *
   * @public
   */
  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
    parser = null,
    generator = null,
  }: Base.Options) {
    super()

    this.test = isFunction(test) ? test : () => test

    if (use) {
      this.use = isFunction(use) ? use : () => use
    }

    if (exclude) {
      this.exclude = isFunction(exclude)
        ? exclude
        : () => exclude
    }

    if (type) {
      this.type = isFunction(type) ? type : () => type
    }

    if (parser) {
      this.parser = isFunction(parser) ? parser : () => parser
    }

    if (generator) {
      this.generator = isFunction(generator)
        ? generator
        : () => generator
    }
  }

  /**
   *
   * @param app - {@link @roots/bud-framework#Framework | Framework}
   * @returns
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getTest(app: Framework): RegExp {
    return this.test ? this.test(app) : null
  }

  @bind
  public setTest(
    test: RegExp | ((app: Framework) => RegExp),
  ): void {
    this.test = isFunction(test) ? test : () => test
  }

  @bind
  public getParser(app: Framework): Base.Parser {
    return this.parser ? this.parser(app) : null
  }

  @bind
  public setParser(
    parser: Maybe<[Framework], Base.Parser>,
  ): void {
    this.parser = isFunction(parser) ? parser : () => parser
  }

  @bind
  public getUse(app: Framework): Item.Interface[] {
    return this.use ? this.use(app) : null
  }

  @bind
  public setUse(
    use: Maybe<[Framework], Item.Interface[]>,
  ): void {
    this.use = isFunction(use) ? use : () => use
  }

  @bind
  public getExclude(app: Framework): RegExp {
    return this.exclude ? this.exclude(app) : null
  }

  @bind
  public setExclude(exclude: Maybe<[Framework], RegExp>): void {
    this.exclude = isFunction(exclude) ? exclude : () => exclude
  }

  @bind
  public getType(app: Framework) {
    return this.type ? this.type(app) : null
  }

  @bind
  public setType(type) {
    this.type = isFunction(type) ? type : () => type
  }

  @bind
  public getGenerator(app: Framework) {
    return this.generator ? this.generator(app) : null
  }

  @bind
  public setGenerator(generator) {
    this.generator = isFunction(generator)
      ? generator
      : () => generator
  }

  /**
   * Produce final Base output
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns finalized rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(app: Framework) {
    const output: Base.Output = {
      test: this.test(app),
    }

    if (this.use) {
      output.use = this.use(app).map(item => item.make(app))
    }

    if (this.exclude) {
      output.exclude = this.exclude(app)
    }

    if (this.type) {
      output.type = this.type(app)
    }

    if (this.parser) {
      output.parser = this.parser(app)
    }

    if (this.generator) {
      output.generator = this.generator(app)
    }

    return output
  }
}
