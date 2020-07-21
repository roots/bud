/**
 * Dump generated webpack config for debugging
 *
 * ```js
 * bud.dump(true)
 * ```
 */
const dump = function (enabled: boolean = true): bud {
  this.features.dump = enabled

  return this
}

export {dump}
import type {bud} from '..'
