import {bud} from '../bud'

interface mapInterface {
  (enabled: boolean): bud;
}

type Map = mapInterface;

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
const map: Map = function (enabled: boolean): bud {
  this.features.map = enabled

  return this
}

export {map}
