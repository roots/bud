import type {Bud} from '@roots/bud-framework'
import type {
  Options,
  Output,
  Parser,
  Rule as Interface,
} from '@roots/bud-framework/services/build/rule'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import type {RuleSetRule} from '@roots/bud-support/webpack'

import Base from '../shared/base.js'

/**
 * RuleSetRule
 */
class Rule extends Base implements Interface {
  /**
   * RuleSetRule test
   */
  public test: Options['test']

  /**
   * RuleSetRule use
   */
  public use?: Options[`use`]

  /**
   * RuleSetRule include
   */
  public include?: Options['include']

  /**
   * RuleSetRule exclude
   */
  public exclude?: Options['exclude']

  /**
   * RuleSetRule type
   */
  public type?: Options['type']

  /**
   * RuleSetRule resourceQuery
   */
  public resourceQuery?: Options['resourceQuery']

  /**
   * RuleSetRule parser
   */
  public parser?: Options['parser']

  /**
   * RuleSetRule generator
   */
  public generator?: Options['generator']

  /**
   * Class constructor
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
   */
  @bind
  public getTest(): Output['test'] {
    return this.unwrap(this.test)
  }

  /**
   * Set test value
   */
  @bind
  public setTest(test: Options['test']): this {
    this.test = test
    return this
  }

  /**
   * Get parser value
   */
  @bind
  public getParser(): Output['parser'] {
    return this.unwrap(this.parser)
  }

  /**
   * Set parser value
   */
  @bind
  public setParser(parser: Interface['parser']): this {
    this.parser = this.wrap(parser)
    return this
  }

  /**
   * Get use value
   */
  @bind
  public getUse(): Options[`use`] {
    return this.use
  }

  /**
   * Set use value
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
   */
  @bind
  public getInclude(): Array<string | RegExp> {
    return this.include?.map(item =>
      isFunction(item) ? item(this.app) : item,
    )
  }

  /**
   * Set include value
   */
  @bind
  public setInclude(includes: Options['include']): this {
    this.include = isFunction(includes) ? includes(this.include) : includes
    return this
  }

  /**
   * Get include value
   */
  @bind
  public getResourceQuery(): Output[`resourceQuery`] {
    return this.resourceQuery
  }

  /**
   * Set include value
   */
  @bind
  public setResourceQuery(query: Options['resourceQuery']): this {
    this.resourceQuery = query
    return this
  }

  /**
   * Get exclude value
   */
  @bind
  public getExclude(): Array<string | RegExp> {
    return this.exclude?.map(this.unwrap)
  }

  /**
   * Set exclude value
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
   */
  @bind
  public getType(): string {
    return this.unwrap(this.type)
  }

  /**
   * Set type value
   */
  @bind
  public setType(type: Options[`type`]): this {
    this.type = type
    return this
  }

  /**
   * Get generator value
   */
  @bind
  public getGenerator() {
    return this.unwrap(this.generator)
  }

  /**
   * Set generator value
   */
  @bind
  public setGenerator(generator: Options['generator']): this {
    this.generator = this.wrap(generator)
    return this
  }

  /**
   * Produce final Base output
   */
  @bind
  public toWebpack(): Output & RuleSetRule {
    const output: Output = Object.entries({
      test: this.getTest(),
      type: this.getType(),
      parser: this.getParser(),
      generator: this.getGenerator(),
      use: this.getUse()
        ?.filter(Boolean)
        .map(item =>
          isString(item) && item in this.app.build.items
            ? this.app.build.items[item]
            : item,
        )
        .filter(Boolean)
        .map(item =>
          !isString(item) && `toWebpack` in item ? item.toWebpack() : item,
        ),
      resourceQuery: this.getResourceQuery(),
      include: this.getInclude(),
      exclude: this.getExclude(),
    }).reduce((a, [k, v]) => {
      if (v === undefined) return a
      return {...a, [k]: v}
    }, {})

    return output
  }
}

export {Rule}
export {Interface, Options, Output, Parser}
