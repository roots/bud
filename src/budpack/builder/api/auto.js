/**
 * Make API: auto
 *
 * @type   {func.<makeAuto>}
 * @param  {object.<bud>}
 * @return {func.<auto>}
 */
const makeAuto = bud => {
  /**
   * Automatically load modules instead of needing to import them.
   *
   * @typedef {func.<auto>}            auto
   * @param   {object.<string, array>} identifier - modules
   * @return  {object.<bud>}           bud instance
   */
  const auto = auto => {
    Object.entries(auto).forEach(([key, value]) => {
      value.forEach(handle => {
        bud.options.auto = {
          ...bud.options.auto,
          [handle]: key,
        }
      })
    })

    return bud
  }

  return auto
}

export {makeAuto}
