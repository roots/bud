import type {Bud, Translate} from './Types'

/**
 * ## bud.translate
 *
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * ```js
 * bud.translate('resources/languages/sage.pot')
 * ```
 */
const translate: Translate = function (
  output: string,
): Bud {
  this.state.features.translate = output ? true : false

  this.state.features.translate &&
    (() => {
      this.state.options.babel = {
        ...this.state.options.babel,
        plugins: [
          ...this.state.options.babel.plugins,
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
