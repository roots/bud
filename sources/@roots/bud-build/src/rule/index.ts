import type {Bud, Items} from '@roots/bud-framework'
import type {
  Options,
  Output,
  Parser,
  Rule as Interface,
} from '@roots/bud-framework/services/build/rule'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'

import type {Item} from '../item/index.js'
import Base from '../shared/base.js'

export {Interface, Options, Output, Parser}

/**
 * Bud Rule
 */
class Rule extends Base implements Interface {
  /**
   * @public
   */
  public test: Options['test']

  /**
   * @public
   */
  public use?: Options[`use`]

  /**
   * @public
   */
  public include?: Options['include']

  /**
   * @public
   */
  public exclude?: Options['exclude']

  /**
   * @public
   */
  public type?: Interface['type']

  /**
   * @public
   */
  public resourceQuery?: Interface['resourceQuery']

  /**
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

    this.setTest(options.test)
    this.setUse(options.use)
    this.setInclude(options.include)
    this.setExclude(options.exclude)
    this.setType(options.type)
    this.setParser(options.parser)
    this.setGenerator(options.generator)
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
  public setTest(test: Options['test']): this {
    this.test = test
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
    use: Options[`use`] | ((use: Options[`use`]) => Options[`use`]),
  ): this {
    this.use = isFunction(use) ? use(this.getUse()) : use
    return this
  }

  /**
   * Get include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getInclude(): Array<string | RegExp> {
    return this.include?.map(item =>
      isFunction(item) ? item(this.app) : item,
    )
  }

  /**
   * Set include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setInclude(includes: Options['include']): this {
    this.include = isFunction(includes) ? includes(this.include) : includes
    return this
  }

  /**
   * Get include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getResourceQuery(): Output[`resourceQuery`] {
    return this.resourceQuery
  }

  /**
   * Set include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setResourceQuery(query: Options['resourceQuery']): this {
    this.resourceQuery = query
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
    return this.exclude?.map(this.unwrap)
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
    this.exclude = isFunction(excludes) ? excludes(this.exclude) : excludes
    return this
  }

  /**
   * Get type value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getType(): string {
    return this.unwrap(this.type)
  }

  /**
   * Set type value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setType(type: Options[`type`]): this {
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
    const output: Output = Object.entries({
      test: this.getTest(),
      type: this.getType(),
      parser: this.getParser(),
      generator: this.getGenerator(),
      use: this.getUse()
        ?.map(item => (isString(item) ? this.app.build.items[item] : item))
        .map(item => item.toWebpack()),
      resourceQuery: this.getResourceQuery(),
      include: this.getInclude(),
      exclude: this.getExclude(),
    }).reduce((a, [k, v]) => {
      if (v === undefined) return a
      return {...a, [k]: v}
    }, {})

    this.app.info(output)

    return output
  }
}

export {Rule}
