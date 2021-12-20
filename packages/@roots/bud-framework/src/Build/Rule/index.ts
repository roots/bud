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
export type Options = Partial<{
  test: Maybe<Array<Framework>, RegExp>
  use: Maybe<Array<Framework>, Array<Item.Interface>>
  exclude: Maybe<Array<Framework>, RegExp>
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
