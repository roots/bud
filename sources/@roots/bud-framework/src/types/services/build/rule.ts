import type {Bud} from '../../../index.js'
import type {Items} from '../../../index.js'
import type {RuleSetRule} from '../../config/index.js'
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
  exclude?: Array<((app: Bud) => RegExp | string) | RegExp | string>

  generator?: ((app: Bud) => Output[`generator`]) | Output[`generator`]

  include?: Array<((app: Bud) => RegExp | string) | RegExp | string>

  parser?: ((app: Bud) => Output[`parser`]) | Output[`parser`]

  resolve?: ((app: Bud) => Output[`resolve`]) | Output[`resolve`]

  resourceQuery?: Output[`resourceQuery`]

  test?: ((app: Bud) => Output[`test`]) | Output[`test`]

  type?: ((app: Bud) => Output[`type`]) | Output[`type`]

  use?: Array<`${keyof Items & string}` | Item | undefined>
}

/**
 * Output
 */
export interface Output extends RuleSetRule {
  exclude?: Array<RegExp | string>
  include?: Array<RegExp | string>
  resourceQuery?: Array<RegExp> | RegExp | string
  test?: Array<RegExp | string> | RegExp | string
}

export interface Rule extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Use item
   */
  exclude?: Options[`exclude`]

  /**
   * Generator
   */
  generator?: Options[`generator`]

  /**
   * Get the value of `exclude`
   */
  getExclude(): Output[`exclude`]

  /**
   * Get the value of `generator`
   */
  getGenerator(): Output[`generator`]

  /**
   * Get the value of `include`
   */
  getInclude(): Output[`include`]

  /**
   * Get the value of `parser`
   */
  getParser(): Options[`parser`]

  /**
   * Get the value of `resolve`
   */
  getResolve(): Output[`resolve`]

  /**
   * Get the value of `resourceQuery`
   */
  getResourceQuery(): Output[`resourceQuery`]

  /**
   * Get the value of `test`
   */
  getTest(): Output[`test`]

  /**
   * Get the value of `type`
   */
  getType(): Output[`type`]

  /**
   * Get the value of `use`
   */
  getUse(): Array<`${keyof Items & string}` | Item>

  /**
   * Include paths
   */
  include?: Options[`include`]

  /**
   * Parser
   */
  parser?: Options[`parser`]

  /**
   * Value of `resolve`
   */
  resolve?: Options[`resolve`]

  /**
   * Include paths
   */
  resourceQuery?: Options[`resourceQuery`]

  /**
   * Set the value of `exclude`
   */
  setExclude(
    excludes:
      | ((excludes: Options[`exclude`]) => Options[`exclude`])
      | Options[`exclude`],
  ): this

  /**
   * Set the value of `generator`
   */
  setGenerator(Generator: Options[`generator`]): this

  /**
   * Set the value of `include`
   */
  setInclude(value: Options[`include`]): this

  /**
   * Set the value of `parser`
   */
  setParser(parser: Options[`parser`]): this

  /**
   * Set the value of `resolve`
   */
  setResolve(fullySpecfied: Options[`resolve`]): this

  /**
   * Set the value of `resourceQuery`
   */
  setResourceQuery(value: Options[`resourceQuery`]): this

  /**
   * Set the value of `test`
   */
  setTest(test: Options[`test`]): this

  /**
   * Set the value of `type`
   */
  setType(type: Options[`type`]): this

  /**
   * Set the value of `use`
   */
  setUse(
    use:
      | ((
          use: Array<`${keyof Items & string}` | Item>,
        ) => Array<`${keyof Items & string}` | Item>)
      | Array<`${keyof Items & string}` | Item>,
  ): this

  /**
   * Test pattern
   */
  test: Options[`test`]

  /**
   * Returns final RuleSetRule
   */
  toWebpack(): Output

  /**
   * Type
   */
  type?: Options[`type`]

  /**
   * Use item
   */
  use?: Options[`use`]
}
