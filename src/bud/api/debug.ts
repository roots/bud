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
const debug: Debug = function (enabled: boolean): bud {
  this.features.debug = enabled

  return this
}

export {debug}

import type {bud} from '..'

export type Debug = (enabled: boolean) => bud
