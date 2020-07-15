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
 *
 * @typedef {function (enabled: boolean) => {bud: import('../index')}} maps
 * @param   {boolean} mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {bud} bud
 */
const map = enabled => {
  this.features.map = enabled

  return this
}

export {map}
