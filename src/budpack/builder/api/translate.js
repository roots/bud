/**
 * API builder: makeTranslate
 *
 * @type   {func.<makeTranslate>}
 * @param  {object.<bud>}
 * @return {func.<translate>}
 */
const makeTranslate = bud => {
  /**
   * Process @wordpress/i18n strings from JS source assets.
   *
   * If you are already translating strings with `yarn translate` then
   * there is no reason to run this separately.
   *
   * @param {string} output - output makepot
   * @return {object.<bud>} bud instance
   */
  const translate = output => {
    bud.features.translate = output ? true : false

    bud.features.translate && (() => {
      bud.options.babel = {
        ...bud.options.babel,
        plugins: [
          ...bud.options.babel.plugins,
          [require('@wordpress/babel-plugin-makepot'),
            {output: output},
          ],
        ],
      }
    })()

    return bud
  }

  return translate
}

export {makeTranslate}
