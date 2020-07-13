/**
 * Purge unused CSS from compiled stylesheets.
 */
export type purge = (arg0: {
  enabled: boolean
  content: any
  css: any
  defaultExtractor?: Function
  extractors?: any[]
  fontFace: boolean
  keyframes: boolean
  output: string
  rejected: boolean
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
  whitelist?: string[]
  whitelistPatterns?: RegExp[]
  whitelistPatternsChildren?: RegExp[]
}) => {
  bud: typeof import('./../index')
}
/**
 * Purge unused CSS from compiled stylesheets.
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 * @example
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * @typedef {function ({enabled: boolean, content: Object, css: Object, defaultExtractor?: Function, extractors?: array, fontFace: boolean, keyframes: boolean, output: string, rejected: boolean, stdin?: boolean, stdout?: boolean, variables?: boolean, whitelist?: string[], whitelistPatterns?: RegExp[], whitelistPatternsChildren?: RegExp[] }) => {bud: typeof import('./../index')}} purge
 * @param   {{enabled: boolean, content: Object, css: Object, defaultExtractor?: Function, extractors?: array, fontFace: boolean, keyframes: boolean, output: string, rejected: boolean, stdin?: boolean, stdout?: boolean, variables?: boolean, whitelist?: string[], whitelistPatterns?: RegExp[], whitelistPatternsChildren?: RegExp[] }} options - purge options
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
export function purge({
  enabled,
  ...options
}: {
  enabled: boolean
  content: any
  css: any
  defaultExtractor?: Function
  extractors?: any[]
  fontFace: boolean
  keyframes: boolean
  output: string
  rejected: boolean
  stdin?: boolean
  stdout?: boolean
  variables?: boolean
  whitelist?: string[]
  whitelistPatterns?: RegExp[]
  whitelistPatternsChildren?: RegExp[]
}): typeof import('./../index')
//# sourceMappingURL=purge.d.ts.map
