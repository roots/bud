import type {Bud, Watch} from './types'

/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 */
const watch: Watch = function (
  this: Bud,
  watchlist,
  enabled = true,
): Bud {
  this.state.features.watch = enabled ?? true
  this.state.options.devWatch = watchlist

  return this
}

export {watch}
