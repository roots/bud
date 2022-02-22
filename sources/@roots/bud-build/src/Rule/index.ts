import {
  Framework,
  Item,
  Maybe,
  Rule as FrameworkRule,
} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {Base} from '../shared/Base'

/**
 * Framework Rule
 *
 * @public
 */
export class Rule extends Base implements FrameworkRule.Interface {
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
   *
   * @public
   */
  public test?: (app: Framework) => RegExp

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use?: (app: Framework) => Item.Interface[]

  /**
   * Include paths
   */
  public include?: (app: Framework) => Array<string | RegExp>

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude?: (app: Framework) => Array<string | RegExp>

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type?: (app: Framework) => string

  /**
   * Generator factory
   *
   * @public
   */
  public parser?: (app: Framework) => FrameworkRule.Parser

  /**
   * Generator factory
   *
   * @public
   */
  public generator?: (app: Framework) => any

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    public app: Framework,
    options: FrameworkRule.Options,
  ) {
    super()
    if (!options) return

    options.test && this.setTest(options.test)
    options.use && this.setUse(options.use)
    options.include && this.setInclude(options.include)
    options.exclude && this.setExclude(options.exclude)
    options.type && this.setType(options.type)
    options.parser && this.setParser(options.parser)
    options.generator && this.setGenerator(options.generator)
  }

  /**
   * Test value
   *
   * @param app - Framework instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getTest(): RegExp {
    return this.test ? this.test(this.app) : null
  }

  /**
   * Set test value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setTest(test: RegExp | (() => RegExp)): Rule {
    this.test = this.normalizeInput(test)
    return this
  }

  /**
   * Get parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getParser(): FrameworkRule.Parser {
    return this.parser ? this.parser(this.app) : null
  }

  /**
   * Set parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setParser(
    parser: Maybe<[Framework], FrameworkRule.Parser>,
  ): Rule {
    this.parser = this.normalizeInput(parser)
    return this
  }

  /**
   * Get use value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getUse(): Item.Interface[] {
    return this.use ? this.use(this.app) : null
  }

  /**
   * Set use value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setUse(use: Maybe<[Framework], Item.Interface[]>): Rule {
    this.use = this.normalizeInput(use)
    return this
  }

  /**
   * Get exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getInclude(): Array<string | RegExp> {
    return this.include ? this.include(this.app) : null
  }

  /**
   * Set exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setInclude(
    include: Maybe<[Framework], Array<string | RegExp>>,
  ): Rule {
    this.include = this.normalizeInput(include)
    return this
  }

  /**
   * Get exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getExclude(): Array<string | RegExp> {
    return this.exclude ? this.exclude(this.app) : null
  }

  /**
   * Set exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setExclude(
    exclude: Maybe<[Framework], Array<string | RegExp>>,
  ): Rule {
    this.exclude = this.normalizeInput(exclude)
    return this
  }

  /**
   * Get type value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getType() {
    return this.type ? this.type(this.app) : null
  }

  /**
   * Set type value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setType(type): Rule {
    this.type = this.normalizeInput(type)
    return this
  }

  /**
   * Get generator value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getGenerator() {
    return this.generator ? this.generator(this.app) : null
  }

  /**
   * Set generator value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setGenerator(
    generator:
      | FrameworkRule.Interface['generator']
      | ((app: Framework) => FrameworkRule.Interface['generator']),
  ): Rule {
    this.generator = this.normalizeInput(generator)
    return this
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
  public make() {
    const output: FrameworkRule.Output = {
      test: this.test(this.app),
    }

    this.use &&
      Object.assign(output, {
        use: this.use(this.app).map(item => item.make(this.app)),
      })

    this.include &&
      Object.assign(output, {
        include: this.include(this.app),
      })

    this.exclude &&
      Object.assign(output, {
        exclude: this.exclude(this.app),
      })

    this.type &&
      Object.assign(output, {
        type: this.type(this.app),
      })

    this.parser &&
      Object.assign(output, {
        parser: this.parser(this.app),
      })

    this.generator &&
      Object.assign(output, {
        generator: this.generator(this.app),
      })

    return output
  }
}
