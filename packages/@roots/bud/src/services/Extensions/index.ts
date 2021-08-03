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
  public name = 'extensions'

  public repository = extensions
}

export {Extensions}
