import type {Bud} from '@roots/bud-framework/lib/bud'

import type Build from '../service.js'
import type Base from '../shared/base.js'

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
export type Options = {
  test?: Instance['test']
  use?: Instance['use'] | ((use: Instance['use']) => Instance['use'])
  include?: Instance['include']
  exclude?: Instance['exclude']
  type?: Instance['type']
  parser?: Instance['parser']
  generator?: Instance['generator']
}

/**
 * Output
 *
 * @public
 */
export type Output = Partial<{
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
}>

export interface Instance extends Base {
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
  setTest(test: Instance['test']): this

  /**
   * Use item
   *
   * @public
   */
  use?: Array<keyof Build['items'] & string>

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(): Array<keyof Build['items'] & string>

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse<K extends keyof Build['items'] & string>(
    use: ((use: Array<K>, app: Bud) => Array<K>) | Array<K>,
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
      | ((includes: Instance['include']) => Instance['include'])
      | Instance['include'],
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
  setType(type: Instance['type']): this

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
      | ((app: Bud) => Instance['generator'])
      | Instance['generator'],
  ): this

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  toWebpack(): Output
}
