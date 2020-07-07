/**
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 */
export type translate = (
  arg0: any,
  arg1: string,
) => {
  bud: import('./../index')
}
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
export function translate(
  output: string,
): import('./../index')
//# sourceMappingURL=translate.d.ts.map
