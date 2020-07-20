/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ### Example
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 *
 * @param   {boolean}  options.enabled - true to enable purgecss
 * @param   {Object}   options.content
 * @param   {Object}   options.css
 * @param   {Function} options.defaultExtractor
 * @param   {Array}    options.extractors
 * @param   {boolean}  options.fontFace
 * @param   {boolean}  options.keyframes
 * @param   {string}   options.output
 * @param   {boolean}  options.rejected
 * @param   {boolean}  options.stdin
 * @param   {boolean}  options.stdout
 * @param   {boolean}  options.variables
 * @param   {string}   options.whitelist
 * @param   {RegExp[]} options.whitelistPatterns
 * @param   {RegExp[]} options.whitelistPatternsChildren
 * @return  {typeof import('./../index')} bud
 */
export function purge({ enabled, ...options }: boolean): typeof import('./../index');
