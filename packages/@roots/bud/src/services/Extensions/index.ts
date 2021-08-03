import {Extensions as Contract} from '@roots/bud-extensions'
import {Framework, Service} from '@roots/bud-framework'

import {extensions} from '../../extensions'

/**
 * @sealed
 */
class Extensions
  extends Contract
  implements Service<Framework.Extensions>
{
  public name = 'extensions'

  public repository = extensions
}

export {Extensions}
