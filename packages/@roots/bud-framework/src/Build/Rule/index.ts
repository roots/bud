import {Framework, Maybe} from '../..'
import * as Item from '../Item'
import Abstract from './Abstract'
import Interface from './Interface'

export {Interface}
export {Abstract}

/**
 * File parser interface
 *
 * @public
 */
export interface Parser {
  parse: (input?: string) => any
}

/**
 * Options interface
 *
 * @public
 */
export interface Options
  extends Partial<{
    test: Maybe<[Framework], RegExp>
    use: Maybe<[Framework], Item.Interface[]>
    exclude: Maybe<[Framework], RegExp>
    type: Maybe<[Framework], string>
    parser: Maybe<[Framework], Parser>
    generator: Maybe<[Framework], any>
  }> {}

/**
 * Output
 *
 * @public
 */
export interface Output
  extends Partial<{
    test: RegExp
    use?: {
      loader: string
      options?: {[key: string]: any}
    }[]
    exclude?: RegExp
    type?: string
    parser?: Parser
    generator?: any
  }> {}
