import type {Bud, SourceMap} from './types'

/**
 * ## bud.map
 *
 * Enable or disable source-maps
 *
 * ### Example
 *
 * ```js
 * bud.map(true)
 * ```
 */
const map: SourceMap = function (enabled: boolean = true): Bud {
  this.state.features.sourceMap = enabled ?? true

  return this
}

export {map}
