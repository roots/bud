import {Extensions as Base} from '@roots/bud-extensions'

import {repository} from './repository'

/**
 * Extensions service
 *
 * @public
 */
export class Extensions extends Base {
  public repository = repository
}
