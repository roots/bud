import {RuleSetRule} from 'webpack'

import {Maybe} from '../..'
import {Framework} from '../../Framework'
import * as Item from '../Item'
import {Output, Parser} from '.'

/**
 * Rule abstract class
 *
 * @public
 */
export default abstract class Rule {
  /**
   * Test pattern
   *
   * @public
   */
  public abstract test?(app?: Framework): RuleSetRule['test']

  /**
   * Use item
   *
   * @public
   */
  public abstract use?(app?: Framework): Item.Interface[]

  /**
   * Get the value of `test`
   *
   * @public
   */
  public abstract getTest(app: Framework): RegExp

  /**
   * Set the value of `test`
   *
   * @public
   */
  public abstract setTest(test: Maybe<[Framework], RegExp>): void

  /**
   * Get the value of `use`
   *
   * @public
   */
  public abstract getUse(app: Framework): Item.Interface[]

  /**
   * Set the value of `use`
   *
   * @public
   */
  public abstract setUse(
    use: Maybe<[Framework], Item.Interface[]>,
  ): void

  /**
   * Get the value of `exclude`
   *
   * @public
   */
  public abstract getExclude(app: Framework): Output['exclude']

  /**
   * Set the value of `exclude`
   *
   * @public
   */
  public abstract setExclude(
    exclude: Maybe<[Framework], RegExp>,
  ): void

  /**
   * Get the value of `type`
   *
   * @public
   */
  public abstract getType(app: Framework): Output['type']

  /**
   * Set the value of `type`
   *
   * @public
   */
  public abstract setType(type: Maybe<[Framework], string>): void

  /**
   * Get the value of `parser`
   *
   * @public
   */
  public abstract getParser(app: Framework): Parser

  /**
   * Set the value of `parser`
   *
   * @public
   */
  public abstract setParser(
    parser: Maybe<[Framework], Parser>,
  ): void

  /**
   * Get the value of `generator`
   *
   * @public
   */
  public abstract getGenerator(app: Framework): any

  /**
   * Set the value of `generator`
   *
   * @public
   */
  public abstract setGenerator(
    Generator: Maybe<[Framework], any>,
  ): void

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  public abstract make(app: Framework): Output | RuleSetRule
}
