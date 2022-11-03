import type {Bud} from '@roots/bud-framework'
import type {
  Interface,
  Options,
  Output,
  Parser,
} from '@roots/bud-framework/services/build/rule'
import type {Item} from '@roots/bud-framework/src/types/services/build/item.js'
import type {Items} from '@roots/bud-framework/src/types/services/build/registry.js'
import {bind} from '@roots/bud-support/decorators'
import {isFunction, isString} from '@roots/bud-support/lodash-es'

import Base from '../shared/base.js'

export {Interface, Options, Output, Parser}

/**
 * Bud Rule
 *
 * @public
 */
export default class Rule extends Base implements Interface {
  /**
   * Rule test
   *
   * @public
   */
  public test: Interface['test']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use?: Array<`${keyof Items & string}` | Item>

  /**
   * Include paths
   */
  public include?: Options['include']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude?: Options['exclude']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type?: Interface['type']

  /**
   * Generator factory
   *
   * @public
   */
  public parser?: Interface['parser']

  /**
   * Generator factory
   *
   * @public
   */
  public generator?: Interface['generator']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: () => Bud, options?: Options) {
    super(_app)
    this._app = _app

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
  public getTest(): Output['test'] {
    return this.unwrap(this.test)
  }

  /**
   * Set test value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setTest(test: Interface['test']): this {
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
  public getParser(): Output['parser'] {
    return this.unwrap(this.parser)
  }

  /**
   * Set parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setParser(parser: Interface['parser']): this {
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
  public getUse(): Array<`${keyof Items & string}` | Item> {
    return this.use
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
      | Array<`${keyof Items & string}` | Item>
      | ((
          use: Array<`${keyof Items & string}` | Item>,
        ) => Array<`${keyof Items & string}` | Item>),
  ): this {
    this.use = isFunction(input) ? input(this.getUse() ?? []) : input
    return this
  }

  /**
   * Get include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getInclude(): Options['include'] {
    return this.include.map(this.unwrap)
  }

  /**
   * Set include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setInclude(
    includes:
      | Options['include']
      | ((includes: Options['include']) => Options['include']),
  ): this {
    if (!this.include) this.include = []

    this.include = isFunction(includes) ? includes(this.include) : includes

    return this
  }

  /**
   * Get exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getExclude(): Interface['exclude'] {
    return this.exclude.map(this.unwrap)
  }

  /**
   * Set exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setExclude(
    excludes:
      | Options['exclude']
      | ((excludes: Options['exclude']) => Options['exclude']),
  ): this {
    if (!this.exclude) this.exclude = []

    if (isFunction(excludes)) this.exclude = excludes(this.exclude)
    else this.exclude = excludes

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
  public setType(type): this {
    this.type = type
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
  public setGenerator(generator: Interface['generator']): this {
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
  public toWebpack(): Output {
    const output: Output = {test: this.getTest()}

    this.include && Object.assign(output, {include: this.getInclude()})
    this.exclude && Object.assign(output, {exclude: this.getExclude()})
    this.type && Object.assign(output, {type: this.getType()})
    this.parser && Object.assign(output, {parser: this.getParser()})
    this.generator &&
      Object.assign(output, {generator: this.getGenerator()})

    if (this.getUse()) {
      Object.assign(output, {
        use: this.getUse()
          .map(item =>
            isString(item) ? this.app.build.items[item] : item,
          )
          .map(item => item.toWebpack()),
      })
    }

    this.app.info(output)
    return output
  }
}
