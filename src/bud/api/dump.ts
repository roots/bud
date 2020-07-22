/**
 * Dump generated webpack config for debugging
 *
 * ```js
 * bud.dump(true)
 * ```
 */
const dump = function (enabled: boolean = true): Bud {
  this.state.features.dump = enabled

  return this
}

export = dump
import type {Bud} from '..'
