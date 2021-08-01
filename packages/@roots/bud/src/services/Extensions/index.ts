/**
 * @module @roots/bud
 */

import {Extensions as Contract} from '@roots/bud-extensions'

import {extensions} from '../../extensions'

/**
 * @class Extensions
 */
class Extensions extends Contract {
  /**
   * @property {string} name
   */
  public name = 'extensions'

  /**
   * @property {Contract.repository} repository
   */
  public repository = extensions
}

/**
 * @exports Extensions
 */
export {Extensions}
