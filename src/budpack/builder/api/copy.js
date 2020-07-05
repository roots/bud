/**
 * API builder: makeCopy
 *
 * @type   {func.<makeCopy>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeCopy = bud => {
  /**
   * Copy a file from a src to dist.
   * @typedef {func.<copy>}  copy
   * @param   {string}       src - copy from
   * @param   {string}       dist - copy to
   * @return  {object.<bud>} bud instance
   */
  const copy = (from, to = null) => {
    bud.options.copy.patterns.push({from, to})

    return bud
  }

  return copy
}

export {makeCopy}
