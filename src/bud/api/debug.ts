/**
 * ## bud.debug
 *
 * Enable or disable debug mode.
 *
 * ```js
 * bud.debug(true) // debug enabled
 * ```
 *
 * ```js
 * bud.debug(false) // debug disabled
 * ```
 */
const debug: Debug = function (enabled: boolean): Bud {
  this.state.features.debug = enabled

  return this
}

export default debug

import type {Bud, Debug} from '.'
