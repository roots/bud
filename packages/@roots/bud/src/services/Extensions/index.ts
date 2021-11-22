import {Extensions as Base} from '@roots/bud-extensions'

import {extensions} from '../../extensions'

/**
 * Extensions service
 *
 * @public
 */
export class Extensions extends Base {
  /**
   * Service ident
   *
   * @public
   */
  public ident = 'bud.extensions'

  public repository = extensions()
}
