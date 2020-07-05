/**
 * API builder: bundle
 *
 * @type   {func.<makeBundle>}
 * @param  {object.<bud>}
 * @return {func.<bundle>}
 */
const makeBundle = bud => {
  /**
   * Bundle assets
   *
   * @typedef {func.<bundle>}
   * @param  {string} name - output name.
   * @param  {array}  entries - array of src assets to include in the bundle.
   * @return {object.<bud>}
   */
  const bundle = (to, from) => {
    bud.options.entry = {
      ...bud.options.entry,
      [`${to}`]: from,
    }

    return bud
  }

  return bundle
}

export {makeBundle}
