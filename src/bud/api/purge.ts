import type {Bud, Purge} from './types'

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
const purge: Purge = function ({enabled = true, ...options}): Bud {
  if (enabled) {
    this.state.options.postCss.plugins = [
      ...this.state.options.postCss.plugins,
      require('@fullhuman/postcss-purgecss')(options),
    ]
  }

  return this
}

export {purge}
