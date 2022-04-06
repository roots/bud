import {Bud} from '../../..'
import {Items} from '..'

/**
 * Loader rule definition
 *
 * @public
 */
export namespace Rule {
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
    test?: Rule['test']
    use?: Rule['use'] | ((use: Rule['use'], app: Bud) => Rule['use'])
    include?: Rule['include']
    exclude?: Rule['exclude']
    type?: Rule['type']
    parser?: Rule['parser']
    generator?: Rule['generator']
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
    exclude?: RegExp
    type?: string
    parser?: Parser
    generator?: any
  }>
}

export interface Rule {
  /**
   * The {@link Bud} instance
   *
   * @public
   */
  app: Bud

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
  setTest(test: Rule['test']): Rule

  /**
   * Use item
   *
   * @public
   */
  use?: Array<`${keyof Items & string}`>

  /**
   * Get the value of `use`
   *
   * @public
   */
  getUse(): Array<`${keyof Items & string}`>

  /**
   * Set the value of `use`
   *
   * @public
   */
  setUse(
    use: ((use: Rule['use'], app: Bud) => Rule['use']) | Rule['use'],
  ): Rule

  /**
   * Use item
   *
   * @public
   */
  exclude?:
    | ((app: Bud) => Array<string | RegExp>)
    | Array<string | RegExp>

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
  setExclude(exclude: Rule['exclude']): Rule

  /**
   * Include paths
   *
   * @public
   */
  include?:
    | ((app: Bud) => Array<string | RegExp>)
    | Array<string | RegExp>

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
  setInclude(include: Rule['include']): Rule

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
  setType(type: Rule['type']): Rule

  /**
   * Parser
   *
   * @public
   */
  parser?: ((app: Bud) => Rule.Parser) | Rule.Parser

  /**
   * Get the value of `parser`
   *
   * @public
   */
  getParser(): Rule.Parser

  /**
   * Set the value of `parser`
   *
   * @public
   */
  setParser(parser: ((app: Bud) => Rule.Parser) | Rule.Parser): Rule

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
    Generator: ((app: Bud) => Rule['generator']) | Rule['generator'],
  ): Rule

  /**
   * Returns final RuleSetRule
   *
   * @public
   */
  toWebpack(): Rule.Output
}
