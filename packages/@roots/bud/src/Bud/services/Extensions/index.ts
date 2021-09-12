import {Extensions as Base} from '@roots/bud-extensions'
import {Extensions as Contract} from '@roots/bud-framework'

import {extensions} from '../../extensions'

/**
 * Extensions service
 *
 * @public
 */
class Extensions extends Base implements Contract {
  public repository = extensions as Extensions['repository']
}

export {Extensions}
