/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
const hot = function (enabled: boolean = true): bud {
  this.features.hot = enabled

  return this
}

export {hot}
import type {bud} from '..'
