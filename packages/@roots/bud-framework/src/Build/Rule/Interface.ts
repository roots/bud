import {RuleSetRule} from 'webpack'

import {Maybe} from '../../'
import {Framework} from '../../Framework'
import * as Item from '../Item'
import {Output, Parser} from '.'

/**
 * Rule interface
 *
 * @public
 */
export default interface Rule {
  /**
   * Test pattern
   *
   * @public
   */
  test?(app?: Framework): RuleSetRule['test']

  /**
   * Use item
   *
   * @public
   */
  use?(app?: Framework): Item.Interface[]

  /**
   * Get the value of `test`
   *
   * @public
   */
  getTest(app: Framework): RegExp

  /**
   * Set the value of `test`
   *
   * @public
   */
  setTest(test: Maybe<[Framework], RegExp>): void

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(app: Framework): Item.Interface[]

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse(use: Maybe<[Framework], Item.Interface[]>): void

  /**
   * Get the value of `exclude`
   *
   * @public
   */
  getExclude(app: Framework): Output['exclude']

  /**
   * Set the value of `exclude`
   *
   * @public
   */
  setExclude(exclude: Maybe<[Framework], RegExp>): void

  /**
   * Get the value of `type`
   *
   * @public
   */
  getType(app: Framework): Output['type']

  /**
   * Set the value of `type`
   *
   * @public
   */
  setType(type: Maybe<[Framework], string>): void

  /**
   * Get the value of `parser`
   *
   * @public
   */
  getParser(app: Framework): Parser

  /**
   * Set the value of `parser`
   *
   * @public
   */
  setParser(parser: Maybe<[Framework], Parser>): void

  /**
   * Get the value of `generator`
   *
   * @public
   */
  getGenerator(app: Framework): any

  /**
   * Set the value of `generator`
   *
   * @public
   */
  setGenerator(Generator: Maybe<[Framework], any>): void

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  make(app: Framework): Output | RuleSetRule
}
