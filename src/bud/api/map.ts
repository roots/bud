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
const map: SourceMap = function (enabled: boolean): Bud {
  this.state.features.map = enabled

  return this
}

export {map}
