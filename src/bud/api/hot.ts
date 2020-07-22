/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
const hot = function (enabled: boolean = true): Bud {
  this.state.features.hot = enabled

  return this
}

export {hot}
import type {Bud} from '..'