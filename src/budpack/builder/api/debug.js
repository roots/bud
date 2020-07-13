/**
 * Debug mode
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} debug
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} debug
 */
const debug = enabled => {
  this.features.debug = enabled

  return this
}

export {debug}
