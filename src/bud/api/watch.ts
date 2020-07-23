/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 */
const watch: Watch = function (enabled: boolean): Bud {
  this.state.features.watch = enabled

  return this
}

export {watch}
import type {Bud, Watch} from '.'
