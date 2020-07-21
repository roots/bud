/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const purge = function ({enabled = true, ...options}): bud {
  if (enabled) {
    this.options.postCss.plugins = [
      ...this.options.postCss.plugins,
      require('@fullhuman/postcss-purgecss')(options),
    ]
  }

  return this
}

export {purge}
import type {bud} from '..'
