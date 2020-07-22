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
const map: Map = function (enabled: boolean): Bud {
  this.state.features.map = enabled

  return this
}

export {map}

import type {Bud} from '..'
export type Map = (enabled: boolean) => Bud
