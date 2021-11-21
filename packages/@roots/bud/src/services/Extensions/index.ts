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
   * @internal
   */
  public ident = 'bud.extensions'

  /**
   * Extensions repository
   *
   * @internal
   */
  public repository = extensions()
}
