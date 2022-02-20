import {Maybe} from '../..'
import {Framework} from '../../Framework'
import {Rule} from '..'
import * as Item from '../Item'

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
export type Options = Partial<{
  test: Maybe<Array<Framework>, RegExp>
  use: Maybe<Array<Framework>, Array<Item.Interface>>
  include: Maybe<Array<Framework>, Array<string | RegExp>>
  exclude: Maybe<Array<Framework>, Array<string | RegExp>>
  type: Maybe<Array<Framework>, string>
  parser: Maybe<Array<Framework>, Parser>
  generator: Maybe<Array<Framework>, any>
}>

/**
 * Output
 *
 * @public
 */
export type Output = Partial<{
  test: RegExp
  use?: {
    loader: string
    options?: {[key: string]: any}
  }[]
  exclude?: RegExp
  type?: string
  parser?: Parser
  generator?: any
}>

export interface Interface {
  /**
   * Framework instance
   */
  app: Framework

  /**
   * Normalize input
   */
  normalizeInput: (input: () => any | any) => any

  /**
   * Test pattern
   *
   * @public
   */
  test?: (app: Framework) => RegExp

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
  setTest(test: Maybe<[Framework], RegExp>): Rule.Interface

  /**
   * Use item
   *
   * @public
   */
  use?: (app: Framework) => Item.Interface[]

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(): Item.Interface[]

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse(use: Maybe<[Framework], Item.Interface[]>): Rule.Interface

  /**
   * Use item
   *
   * @public
   */
  exclude?: (app: Framework) => Array<string | RegExp>

  /**
   * Get the value of `exclude`
   *
   * @public
   */
  getExclude(): Array<string | RegExp>

  /**
   * Set the value of `exclude`
   *
   * @public
   */
  setExclude(
    exclude: Maybe<[Framework], Array<string | RegExp>>,
  ): Rule.Interface

  /**
   * Include paths
   *
   * @public
   */
  include?: (app: Framework) => Array<string | RegExp>

  /**
   * Get the value of `include`
   *
   * @public
   */
  getInclude(): Array<string | RegExp>

  /**
   * Set the value of `include`
   *
   * @public
   */
  setInclude(
    include: Maybe<[Framework], Array<string | RegExp>>,
  ): Rule.Interface

  /**
   * Type
   *
   * @public
   */
  type?: (app: Framework) => string

  /**
   * Get the value of `type`
   *
   * @public
   */
  getType(): string

  /**
   * Set the value of `type`
   *
   * @public
   */
  setType(type: Maybe<[Framework], string>): Rule.Interface

  /**
   * Parser
   *
   * @public
   */
  parser?: (app: Framework) => Parser

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
  setParser(parser: Maybe<[Framework], Parser>): Rule.Interface

  /**
   * Generator
   *
   * @public
   */
  generator?: (app: Framework) => any

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
      | ((app: Framework) => Rule.Interface['generator'])
      | Rule.Interface['generator'],
  ): Rule.Interface

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  make(): Output
}
