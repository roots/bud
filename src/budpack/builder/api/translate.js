/**
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * @typedef {function (output: string) => {bud: import('./../index')} translate
 * @example bud.translate('resources/languages/sage.pot')
 * @param   {string} output - output makepot
 * @return  {import('./../index')} bud
 */
const translate = function (output) {
  this.features.translate = output ? true : false

  this.features.translate &&
    (() => {
      this.options.babel = {
        ...this.options.babel,
        plugins: [
          ...this.options.babel.plugins,
          [
            require('@wordpress/babel-plugin-makepot'),
            {output},
          ],
        ],
      }
    })()

  return this
}

export {translate}
