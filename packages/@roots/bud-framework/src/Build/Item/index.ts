import {Framework, Maybe} from '../..'
import * as Loader from '../Loader'
import Abstract from './Abstract'
import Interface from './Interface'

export {Interface}
export {Abstract}

/**
 * Options interface
 *
 * @public
 */
export interface Options {
  [key: string]: any
}

/**
 * Constructor interface
 *
 * @public
 */
export interface ConstructorOptions {
  /**
   * Loader
   *
   * @public
   */
  loader: Maybe<[Framework], Loader.Interface>

  /**
   * Options
   *
   * @public
   */
  options?: Maybe<[Framework], Options>
}

/**
 * Output interface
 *
 * @public
 */
export interface Output {
  /**
   * Finalized loader
   *
   * @public
   */
  loader: string

  /**
   * Finalized options
   *
   * @public
   */
  options?: Options
}
