/**
 * API builder: makeHot
 *
 * @type   {func.<makeHot>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeHot = bud => {
  /**
   * Enable or disable hot module reloading
   *
   * @typedef {func.<hot>}   hot
   * @param   {boolean}      enabled - true to enable hot module reloading. default: !bud.inProduction.
   * @return  {object.<bud>} bud instance
   */
  const hot = enabled => {
    bud.features.hot = enabled

    return bud
  }

  return hot
}

export {makeHot}
