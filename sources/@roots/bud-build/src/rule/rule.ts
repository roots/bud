import type {Bud} from '@roots/bud-framework/bud'
import {bind} from 'helpful-decorators'
import {isFunction, isString} from 'lodash-es'
import type {RuleSetUseItem} from 'webpack'

import Item from '../item/item.js'
import type Build from '../service'
import Base from '../shared/base.js'
import type {Instance, Options, Output, Parser} from './rule.interface'

export {Instance, Options, Output, Parser}

/**
 * Bud Rule
 *
 * @public
 */
export default class extends Base implements Instance {
  /**
   * Rule test
   *
   * @public
   */
  public test: Instance['test']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  public use?: Array<(keyof Build['items'] & string) | RuleSetUseItem>

  /**
   * Include paths
   */
  public include?: Instance['include']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  public exclude?: Instance['exclude']

  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  public type?: Instance['type']

  /**
   * Generator factory
   *
   * @public
   */
  public parser?: Instance['parser']

  /**
   * Generator factory
   *
   * @public
   */
  public generator?: Instance['generator']

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
  public setTest(test: Instance['test']): this {
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
  public getParser(): Parser {
    return this.unwrap(this.parser)
  }

  /**
   * Set parser value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setParser(parser: Instance['parser']): this {
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
  public getUse(): Array<
    `${`${keyof Build['items'] & string}`}` | RuleSetUseItem
  > {
    return this.unwrap(this.use)?.filter(Boolean) ?? []
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
      | Array<(keyof Build['items'] & string) | RuleSetUseItem>
      | ((
          use: Array<(keyof Build['items'] & string) | RuleSetUseItem>,
        ) => Array<(keyof Build['items'] & string) | RuleSetUseItem>),
  ): this {
    this.use = isFunction(input) ? input(this.getUse()) : input

    return this
  }

  /**
   * Get include value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getInclude(): Instance['include'] {
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
      | ((includes: Instance['include']) => Instance['include'])
      | Instance['include'],
  ): this {
    if (!this.include) this.include = []

    if (typeof includes === `function`)
      this.include = includes(this.include)
    else this.include = includes

    return this
  }

  /**
   * Get exclude value
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getExclude(): Instance['exclude'] {
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
      | ((excludes: Instance['exclude']) => Instance['exclude'])
      | Instance['exclude'],
  ): this {
    if (!this.exclude) this.exclude = []

    if (typeof excludes === `function`)
      this.exclude = excludes(this.exclude)
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
  public setGenerator(generator: Instance['generator']): this {
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

    this.use &&
      Object.assign(output, {
        use: this.getUse()
          .map(item =>
            isString(item) ? this.app.build.items[item] : item,
          )
          .map(item => (item instanceof Item ? item.toWebpack() : item)),
      })

    return output
  }
}
