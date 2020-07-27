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
const watch: Watch = function (this: Bud,
  options: {
    paths: string[],
    enabled: boolean,
  }
): Bud {
  this.state.features.watch = options.enabled ?? true
  this.state.options.watch = options.paths ?? []

  return this
}

export {watch}
