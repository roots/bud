import type {RuleSetUseItem} from 'webpack'

import type {Bud} from '../../../bud'
import type {Base} from './base'
import type * as Build from './registry'

/**
 * File parser interface
 *
 * @public
 */
export interface Parser extends Record<string, any> {}

/**
 * Options interface
 *
 * @public
 */
export interface Options {
  test?: Interface['test']
  use?: Interface['use'] | ((use: Interface['use']) => Interface['use'])
  include?: Interface['include']
  exclude?: Interface['exclude']
  type?: Interface['type']
  parser?: Interface['parser']
  generator?: Interface['generator']
}

/**
 * Output
 *
 * @public
 */
export interface Output {
  test?: RegExp
  use?: {
    loader: string
    options?: {[key: string]: any}
  }[]
  include?: Array<RegExp | string>
  exclude?: Array<RegExp | string>
  type?: string
  parser?: Parser
  generator?: any
}

export interface Interface extends Base {
  /**
   * Test pattern
   *
   * @public
   */
  test: ((app: Bud) => RegExp) | RegExp

  /**
   * Get the value of `test`
   *
   * @public
   */
  getTest(): RegExp

  /**
   * Set the value of `test`
   *
   * @public
   */
  setTest(test: Interface['test']): this

  /**
   * Use item
   *
   * @public
   */
  use?: Array<(keyof Build.Items & string) | RuleSetUseItem>

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(): Array<(keyof Build.Items & string) | RuleSetUseItem>

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse(
    use:
      | ((
          use: Array<(keyof Build.Items & string) | RuleSetUseItem>,
        ) => Array<(keyof Build.Items & string) | RuleSetUseItem>)
      | Array<(keyof Build.Items & string) | RuleSetUseItem>,
  ): this

  /**
   * Use item
   *
   * @public
   */
  exclude?: Array<string | RegExp | ((app: Bud) => string | RegExp)>

  /**
   * Get the value of `exclude`
   *
   * @public
   */
  getExclude(): Array<string | RegExp | ((app: Bud) => string | RegExp)>

  /**
   * Set the value of `exclude`
   *
   * @public
   */
  setExclude(
    excludes:
      | ((
          excludes: Array<
            string | RegExp | ((app: Bud) => string | RegExp)
          >,
        ) => Array<string | RegExp | ((app: Bud) => string | RegExp)>)
      | Array<string | RegExp | ((app: Bud) => string | RegExp)>,
  ): this

  /**
   * Include paths
   *
   * @public
   */
  include?: Array<string | RegExp | ((app: Bud) => string | RegExp)>

  /**
   * Get the value of `include`
   *
   * @public
   */
  getInclude(): this['include']

  /**
   * Set the value of `include`
   *
   * @public
   */
  setInclude(
    value:
      | ((includes: Interface['include']) => Interface['include'])
      | Interface['include'],
  ): this

  /**
   * Type
   *
   * @public
   */
  type?: ((app: Bud) => string) | string

  /**
   * Get the value of `type`
   *
   * @public
   */
  getType(): ((app: Bud) => string) | string

  /**
   * Set the value of `type`
   *
   * @public
   */
  setType(type: Interface['type']): this

  /**
   * Parser
   *
   * @public
   */
  parser?: ((app: Bud) => Parser) | Parser

  /**
   * Get the value of `parser`
   *
   * @public
   */
  getParser(): Parser

  /**
   * Set the value of `parser`
   *
   * @public
   */
  setParser(parser: ((app: Bud) => Parser) | Parser): this

  /**
   * Generator
   *
   * @public
   */
  generator?: (app: Bud) => any

  /**
   * Get the value of `generator`
   *
   * @public
   */
  getGenerator(): any

  /**
   * Set the value of `generator`
   *
   * @public
   */
  setGenerator(
    Generator:
      | ((app: Bud) => Interface['generator'])
      | Interface['generator'],
  ): this

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  toWebpack(): Output
}
