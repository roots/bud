import purgePlugin from '@fullhuman/postcss-purgecss'

import * as purge from './purge.interface'

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
 *
 * @public
 */
export const purgecss: purge.api = function (userOptions) {
  this.postcss.setPlugin(
    '@fullhuman/postcss-purgecss',
    purgePlugin(userOptions),
  )

  return this
}
