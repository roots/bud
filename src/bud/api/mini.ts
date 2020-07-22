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
const mini: Mini = function (enable: boolean = true): Bud {
  this.state.features.minified = enable

  return this
}

export {mini}
import type {Bud} from '..'
export type Mini = (enabled?: boolean) => Bud
