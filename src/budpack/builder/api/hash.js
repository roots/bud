/**
 * Make API: hash
 *
 * @type   {func.<makeHash>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeHash = bud => {
  /**
   * Enable or disable filename hashing on compiled assets.
   *
   * @typedef {func.<hash>}
   * @param   {boolean} enabled - true to enable filename hashing.
   * @return  {object.<bud>}
   */
  const hash = enabled => {
    bud.features.hash = enabled

    return bud
  }

  return hash
}

export {makeHash}
