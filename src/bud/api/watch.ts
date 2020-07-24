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
  enabled: boolean,
): Bud {
  this.state.features.watch = enabled

  return this
}

export {watch}
