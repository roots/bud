import type {RuleSetRule} from '@roots/bud-support/webpack'

import type {Bud} from '../../../bud.js'
import type {Items} from '../../../index.js'
import type {Base} from './base.js'
import type {Item} from './item.js'

/**
 * File parser interface
 */
export interface Parser extends Record<string, any> {}

/**
 * Options interface
 */
export interface Options {
  test?: ((app: Bud) => Output['test']) | Output['test'] | undefined
  use?: Array<Item | `${keyof Items & string}` | undefined> | undefined
  include?:
    | Array<((app: Bud) => string | RegExp) | string | RegExp>
    | undefined
  exclude?:
    | Array<((app: Bud) => string | RegExp) | string | RegExp>
    | undefined
  type?: ((app: Bud) => Output['type']) | Output['type'] | undefined
  parser?: ((app: Bud) => Output['parser']) | Output['parser'] | undefined
  resourceQuery?: Output[`resourceQuery`] | undefined
  generator?:
    | ((app: Bud) => Output['generator'])
    | Output['generator']
    | undefined
}

/**
 * Output
 */
export interface Output extends RuleSetRule {
  include?: Array<RegExp | string>
  exclude?: Array<RegExp | string>
  test?: RegExp | string | Array<RegExp | string>
}

export interface Rule extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Test pattern
   */
  test: Options['test']

  /**
   * Get the value of `test`
   */
  getTest(): Output[`test`]

  /**
   * Set the value of `test`
   */
  setTest(test: Options['test']): this

  /**
   * Use item
   */
  use?: Options[`use`]

  /**
   * Get the value of `use`
   */
  getUse(): Array<`${keyof Items & string}` | Item>

  /**
   * Set the value of `use`
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
   */
  exclude?: Options['exclude']

  /**
   * Get the value of `exclude`
   */
  getExclude(): Output['exclude']

  /**
   * Set the value of `exclude`
   */
  setExclude(
    excludes:
      | Options['exclude']
      | ((excludes: Options['exclude']) => Options['exclude']),
  ): this

  /**
   * Include paths
   */
  include?: Options['include']

  /**
   * Get the value of `include`
   */
  getInclude(): Output['include']

  /**
   * Set the value of `include`
   */
  setInclude(value: Options['include']): this

  /**
   * Include paths
   */
  resourceQuery?: Output[`resourceQuery`] | undefined

  /**
   * Get the value of `resourceQuery`
   */
  getResourceQuery(): Output['resourceQuery']

  /**
   * Set the value of `resourceQuery`
   */
  setResourceQuery(value: Options[`resourceQuery`]): this

  /**
   * Type
   */
  type?: Options['type']

  /**
   * Get the value of `type`
   */
  getType(): Output['type']

  /**
   * Set the value of `type`
   */
  setType(type: Options['type']): this

  /**
   * Parser
   */
  parser?: Output['parser']

  /**
   * Get the value of `parser`
   */
  getParser(): Options['parser']

  /**
   * Set the value of `parser`
   */
  setParser(parser: Options['parser']): this

  /**
   * Generator
   */
  generator?: Options['generator']

  /**
   * Get the value of `generator`
   */
  getGenerator(): Output['generator']

  /**
   * Set the value of `generator`
   */
  setGenerator(Generator: Options['generator']): this

  /**
   * Returns final RuleSetRule
   */
  toWebpack(): Output
}
