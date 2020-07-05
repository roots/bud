/**
 * API builder: makeAlias
 *
 * @type   {func.<makeAlias>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeAlias = bud => {
  /**
   * Define webpack aliases.
   *
   * @type   {func.<alias>}
   * @param  {object} alias
   * @return {object.<bud>}
   */
  const alias = alias => {
    bud.options.alias = alias

    return bud
  }

  return alias
}

export {makeAlias}
