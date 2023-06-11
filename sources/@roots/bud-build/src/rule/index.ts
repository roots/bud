import type {Bud} from '@roots/bud-framework'
import type {RuleSetRule} from '@roots/bud-framework/config'
import type {
  Rule as Interface,
  Options,
  Output,
  Parser,
} from '@roots/bud-framework/services/build/rule'

import {bind} from '@roots/bud-support/decorators/bind'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'

import Base from '../shared/base.js'

/**
 * RuleSetRule
 */
class Rule extends Base implements Interface {
  /**
   * RuleSetRule exclude
   */
  public exclude?: Options[`exclude`]

  /**
   * RuleSetRule generator
   */
  public generator?: Options[`generator`]

  /**
   * RuleSetRule include
   */
  public include?: Options[`include`]

  /**
   * RuleSetRule parser
   */
  public parser?: Options[`parser`]

  /**
   * RuleSetRule resolve
   */
  public resolve?: Options[`resolve`]

  /**
   * RuleSetRule resourceQuery
   */
  public resourceQuery?: Options[`resourceQuery`]

  /**
   * RuleSetRule test
   */
  public test: Options[`test`]

  /**
   * RuleSetRule type
   */
  public type?: Options[`type`]

  /**
   * RuleSetRule use
   */
  public use?: Options[`use`]

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
    this.setResolve(options.resolve)
  }

  /**
   * Get `exclude` value
   */
  @bind
  public getExclude(): Array<RegExp | string> {
    return this.exclude?.map(this.unwrap)
  }

  /**
   * Get generator value
   */
  @bind
  public getGenerator() {
    return this.unwrap(this.generator)
  }

  /**
   * Get `include` value
   */
  @bind
  public getInclude(): Array<RegExp | string> {
    return this.include?.map(this.unwrap)
  }

  /**
   * Get `parser` value
   */
  @bind
  public getParser(): Output['parser'] {
    return this.unwrap(this.parser)
  }

  /**
   * Set resolve value
   */
  public getResolve(): Output[`resolve`] {
    return this.unwrap(this.resolve)
  }

  /**
   * Get `include` value
   */
  @bind
  public getResourceQuery(): Output[`resourceQuery`] {
    return isFunction(this.resourceQuery)
      ? this.resourceQuery(this.app)
      : this.resourceQuery
  }

  /**
   * Get `test` value
   */
  @bind
  public getTest(): Output['test'] {
    return this.unwrap(this.test)
  }

  /**
   * Get `type` value
   */
  @bind
  public getType(): string {
    return this.unwrap(this.type)
  }

  /**
   * Get `use` value
   */
  @bind
  public getUse(): Options[`use`] {
    return this.use
  }

  /**
   * Set exclude value
   */
  @bind
  public setExclude(
    excludes:
      | ((excludes: Options['exclude']) => Options['exclude'])
      | Options['exclude'],
  ): this {
    this.exclude = isFunction(excludes) ? excludes(this.exclude) : excludes
    return this
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
   * Set `include` value
   */
  @bind
  public setInclude(includes: Options['include']): this {
    this.include = isFunction(includes) ? includes(this.include) : includes
    return this
  }

  /**
   * Set `parser` value
   */
  @bind
  public setParser(parser: Interface['parser']): this {
    this.parser = this.wrap(parser)
    return this
  }

  /**
   * Set resolve value
   */
  @bind
  public setResolve(resolve: Options[`resolve`]): this {
    this.resolve = resolve
    return this
  }

  /**
   * Set `include` value
   */
  @bind
  public setResourceQuery(query: Options['resourceQuery']): this {
    this.resourceQuery = isFunction(query)
      ? query(this.resourceQuery)
      : query

    return this
  }

  /**
   * Set `test` value
   */
  @bind
  public setTest(test: Options['test']): this {
    this.test = test
    return this
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
   * Set `use` value
   */
  @bind
  public setUse(
    use: ((use: Options[`use`]) => Options[`use`]) | Options[`use`],
  ): this {
    this.use = isFunction(use) ? use(this.getUse()) : use
    return this
  }

  /**
   * Produce final Base output
   */
  @bind
  public toWebpack(): Output & RuleSetRule {
    const output: Output = Object.entries({
      exclude: this.getExclude(),
      generator: this.getGenerator(),
      include: this.getInclude(),
      parser: this.getParser(),
      resolve: this.getResolve(),
      resourceQuery: this.getResourceQuery(),
      test: this.getTest(),
      type: this.getType(),
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
    }).reduce((a, [k, v]) => {
      if (v === undefined) return a
      return {...a, [k]: v}
    }, {})

    this.app.info(`built rule`, output)

    return output
  }
}

export {Rule}
export type {Interface, Options, Output, Parser}
