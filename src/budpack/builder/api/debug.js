/**
 * Debug mode
 *
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} debug
 */
const debug = function (enabled) {
  this.features.debug = enabled

  return this
}

export {debug}
