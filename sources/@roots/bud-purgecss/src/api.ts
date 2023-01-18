import type * as purge from './extension.js'

/**
 * Purge unused CSS from compiled stylesheets
 *
 * @remarks
 * For more information, see [the PurgeCSS API](https://purgecss.com/configuration.html)
 *
 * @example
 * ```js
 * app.purgecss({
 *   content: [app.path('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
export const purgecss: purge.api = function (
  userOptions: purge.UserOptions,
) {
  this.postcss.setPlugin(`purgecss`, [
    `@fullhuman/postcss-purgecss`,
    userOptions,
  ])

  return this
}
