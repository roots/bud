/**
 * Enable or disable source-maps
 *
 * @typedef {function (enabled: boolean) => {bud: import('./../index')}} maps
 * @param   {boolean} mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {bud} bud
 */
const maps = enabled => {
  this.options.mapped = enabled

  return this
}

export {maps}
