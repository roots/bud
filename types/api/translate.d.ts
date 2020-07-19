/**
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * @example bud.translate('resources/languages/sage.pot')
 * @param   {string} output - output makepot
 * @return  {typeof import('./../index')} bud
 */
export function translate(output: string): typeof import('./../index');
