/**
 * ## bud.hot
 *
 * Enable or disable minification
 *
 * ```js
 * bud.hot(true) // enable
 * ```
 *
 * ```js
 * bud.hot(false) // disable
 * ```
 */
const mini = function (enable: boolean = true): bud {
  this.features.minified = enable

  return this
}

export {mini}
import type {bud} from '..'
