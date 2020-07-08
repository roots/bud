/**
 * Enable or disable source-maps
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} maps
 * @param   {boolean} mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
const maps = enabled => {
  this.options.mapped = enabled

  return this
}

export {maps}
