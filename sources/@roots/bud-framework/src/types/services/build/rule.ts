import type {RuleSetRule} from '@roots/bud-support/webpack'

import type {Bud} from '../../../bud.js'
import type {Items} from '../../../index.js'
import type {Base} from './base.js'
import type {Item} from './item.js'

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
  test?: ((app: Bud) => Output['test']) | Output['test']
  use?:
    | ((
        loaders: Array<Item | `${keyof Items & string}`>,
      ) => Array<Item | `${keyof Items & string}`>)
    | Array<Item | `${keyof Items & string}`>
  include?: Array<((app: Bud) => string | RegExp) | string | RegExp>
  exclude?: Array<((app: Bud) => string | RegExp) | string | RegExp>
  type?: ((app: Bud) => Output['type']) | Output['type']
  parser?: ((app: Bud) => Output['parser']) | Output['parser']
  generator?: ((app: Bud) => Output['generator']) | Output['generator']
}

/**
 * Output
 *
 * @public
 */
export interface Output extends RuleSetRule {
  include?: Array<RegExp | string>
  exclude?: Array<RegExp | string>
}

export interface Rule extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Test pattern
   *
   * @public
   */
  test: Options['test']

  /**
   * Get the value of `test`
   *
   * @public
   */
  getTest(): Options['test']

  /**
   * Set the value of `test`
   *
   * @public
   */
  setTest(test: Options['test']): this

  /**
   * Use item
   *
   * @public
   */
  use?: Array<`${keyof Items & string}` | Item>

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(): Array<`${keyof Items & string}` | Item>

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse(
    use:
      | Array<`${keyof Items & string}` | Item>
      | ((
          use: Array<`${keyof Items & string}` | Item>,
        ) => Array<`${keyof Items & string}` | Item>),
  ): this

  /**
   * Use item
   *
   * @public
   */
  exclude?: Options['exclude']

  /**
   * Get the value of `exclude`
   *
   * @public
   */
  getExclude(): Options['exclude']

  /**
   * Set the value of `exclude`
   *
   * @public
   */
  setExclude(
    excludes:
      | Options['exclude']
      | ((excludes: Options['exclude']) => Options['exclude']),
  ): this

  /**
   * Include paths
   *
   * @public
   */
  include?: Options['include']

  /**
   * Get the value of `include`
   *
   * @public
   */
  getInclude(): Options['include']

  /**
   * Set the value of `include`
   *
   * @public
   */
  setInclude(
    value:
      | Options['include']
      | ((includes: Options['include']) => Options['include']),
  ): this

  /**
   * Type
   *
   * @public
   */
  type?: Options['type']

  /**
   * Get the value of `type`
   *
   * @public
   */
  getType(): Options['type']

  /**
   * Set the value of `type`
   *
   * @public
   */
  setType(type: Options['type']): this

  /**
   * Parser
   *
   * @public
   */
  parser?: Options['parser']

  /**
   * Get the value of `parser`
   *
   * @public
   */
  getParser(): Options['parser']

  /**
   * Set the value of `parser`
   *
   * @public
   */
  setParser(parser: Options['parser']): this

  /**
   * Generator
   *
   * @public
   */
  generator?: Options['generator']

  /**
   * Get the value of `generator`
   *
   * @public
   */
  getGenerator(): Options['generator']

  /**
   * Set the value of `generator`
   *
   * @public
   */
  setGenerator(Generator: Options['generator']): this

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  toWebpack(): Output
}
