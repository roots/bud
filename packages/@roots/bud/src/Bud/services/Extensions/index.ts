import {Extensions} from '@roots/bud-extensions'

import {repository} from './repository'

/**
 * Extensions service
 *
 * @public
 */
export default class extends Extensions {
  public repository = repository
}
