import {Bud, Build} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

import {Base} from '../shared/Base'

const {isFunction, isString} = lodash

export namespace Rule {
  export type ConstructorOptions = Partial<Build.Rule.Options>
}

/**
 * Bud Rule
 *
 * @public
 */
export class Rule extends Base implements Build.Rule {
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
   *
   * @public
   */
  public test: Build.Rule['test']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use?: Array<`${`${keyof Build.Items & string}`}`>

  /**
   * Include paths
   */
  public include?: Build.Rule['include']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude?: Build.Rule['exclude']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type?: Build.Rule['type']

  /**
   * Generator factory
   *
   * @public
   */
  public parser?: Build.Rule['parser']

  /**
   * Generator factory
   *
   * @public
   */
  public generator?: Build.Rule['generator']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: () => Bud, options?: Build.Rule.Options) {
    super(_app)

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
   * @param app - Bud instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getTest(): RegExp {
    return this.unwrap(this.test)
  }

  /**
   * Set test value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setTest(test: Rule['test']): Rule {
    this.test = this.wrap(test)
    return this
  }

  /**
   * Get parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getParser(): Build.Rule.Parser {
    return this.unwrap(this.parser)
  }

  /**
   * Set parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setParser(parser: Build.Rule['parser']): Rule {
    this.parser = this.wrap(parser)
    return this
  }

  /**
   * Get use value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getUse(): Array<`${`${keyof Build.Items & string}`}`> {
    return this.unwrap(this.use)?.filter(isString) ?? []
  }

  /**
   * Set use value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setUse(
    input:
      | Array<`${keyof Build.Items & string}`>
      | ((
          use: Array<`${keyof Build.Items & string}`>,
          app: Bud,
        ) => Array<`${keyof Build.Items & string}`>),
  ): Rule {
    this.use =
      (isFunction(input) ? input(this.getUse() ?? [], this.app) : input) ??
      []

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
    return this.unwrap(this.include)
  }

  /**
   * Set exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setInclude(include: Build.Rule['include']): Rule {
    this.include = this.wrap(include)
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
    return this.unwrap(this.exclude)
  }

  /**
   * Set exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setExclude(exclude: Build.Rule['exclude']): Rule {
    this.exclude = this.wrap(exclude)
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
    return this.unwrap(this.type)
  }

  /**
   * Set type value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setType(type): Rule {
    this.type = this.wrap(type)
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
    return this.unwrap(this.generator)
  }

  /**
   * Set generator value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setGenerator(generator: Build.Rule['generator']): Rule {
    this.generator = this.wrap(generator)
    return this
  }

  /**
   * Produce final Base output
   *
   * @param app - {@link @roots/bud-framework#Bud}
   * @returns finalized rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public toWebpack() {
    const output = {test: this.getTest()}

    this.use &&
      Object.assign(output, {
        use: this.getUse().map(item =>
          this.app.build.items[item].toWebpack(),
        ),
      })
    this.include && Object.assign(output, {include: this.getInclude()})
    this.exclude && Object.assign(output, {exclude: this.getExclude()})
    this.type && Object.assign(output, {type: this.getType()})
    this.parser && Object.assign(output, {parser: this.getParser()})
    this.generator &&
      Object.assign(output, {generator: this.getGenerator()})

    return output
  }
}
