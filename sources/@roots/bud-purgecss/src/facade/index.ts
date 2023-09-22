import type {UserDefinedOptions} from '@fullhuman/postcss-purgecss'
import type {Bud} from '@roots/bud-framework'

type Options = ((options?: UserDefinedOptions) => UserDefinedOptions) | UserDefinedOptions

export interface purgecss {
  (this: Bud, options: Options): Bud
}

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
export const purgecss: purgecss = function (options) {
  this.postcss
    .setPlugin(`purgecss`, [`@fullhuman/postcss-purgecss`, options])
    .use(plugins => [...plugins, `purgecss`])

  return this
}
