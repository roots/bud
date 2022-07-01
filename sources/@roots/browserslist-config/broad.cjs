/**
 * Browserslist targeting last 3 browser versions
 *
 * @remarks
 * Cribbed from Shopify
 *
 * @see {@link https://github.com/Shopify/web-configs/tree/main/packages/browserslist-config}
 *
 * @public
 */
module.exports = {
  production: [
    'last 3 chrome versions',
    'last 3 firefox versions',
    'last 3 opera versions',
    'last 3 edge versions',
    'last 3 safari versions',
    'last 3 chromeandroid versions',
    'last 1 firefoxandroid versions',
    'ios >= 13.4',
  ],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version',
  ],
}
