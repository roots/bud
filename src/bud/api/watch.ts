/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 */
const watch = function (enabled: boolean): bud {
  this.features.watch = enabled

  return this
}

export {watch}
import type {bud} from '..'
