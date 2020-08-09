import type {Bud} from '@roots/bud'
import purgecss from '@fullhuman/postcss-purgecss'

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
const config = function (this: Bud, {enabled = true, ...options}): Bud {
  const purgeEnabled = enabled ?? true
  purgeEnabled && this.features.enable('purge')

  const value = {
    ...this.options.get('postCss'),
    plugins: [...this.options.get('postCss').plugins, purgecss(options)],
  }

  this.options.set('postCss', value)

  return this
}

export = config
