import {Framework, Items, Rule as Contract} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

import {Base} from '../shared/Base'

const {isFunction, isString} = lodash

export namespace Rule {
  export type ConstructorOptions = Partial<Contract.Options>
}

/**
 * Framework Rule
 *
 * @public
 */
export class Rule extends Base implements Contract {
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
   *
   * @public
   */
  public test: Contract['test']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use?: Array<keyof Items & string>

  /**
   * Include paths
   */
  public include?: Contract['include']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude?: Contract['exclude']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type?: Contract['type']

  /**
   * Generator factory
   *
   * @public
   */
  public parser?: Contract['parser']

  /**
   * Generator factory
   *
   * @public
   */
  public generator?: Contract['generator']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: () => Framework, options?: Contract.Options) {
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
   * @param app - Framework instance
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
  public getParser(): Contract.Parser {
    return this.unwrap(this.parser)
  }

  /**
   * Set parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setParser(parser: Contract['parser']): Rule {
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
  public getUse(): Array<`${keyof Items & string}`> {
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
      | Array<keyof Items & string>
      | ((
          use: Array<keyof Items & string>,
          app: Framework,
        ) => Array<keyof Items & string>),
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
  public setInclude(include: Contract['include']): Rule {
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
  public setExclude(exclude: Contract['exclude']): Rule {
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
  public setGenerator(generator: Contract['generator']): Rule {
    this.generator = this.wrap(generator)
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
