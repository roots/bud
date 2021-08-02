/**
 * @module Bud.Extensions
 */

import {Extensions as Contract} from '@roots/bud-extensions'
import {Framework, Service} from '@roots/bud-framework'

import {extensions} from '../../extensions'

/**
 * Service: Extensions
 *
 * @implements {Contract}
 */
class Extensions
  extends Contract
  implements Service<Framework.Extensions>
{
  /**
   * @property {string} name
   */
  public name = 'extensions'

  /**
   * @property {Framework.Extensions} repository
   */
  public repository = extensions
}

export {Extensions}
