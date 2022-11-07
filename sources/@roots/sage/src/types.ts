/// <reference path="../../bud-preset-wordpress/lib/index.d.ts" />

import type Acorn from './acorn/index.js'
import type AcornV2PublicPath from './acorn-v2-public-path/extension.js'
import type Sage from './sage/index.js'
import type ThemeJSON from './wp-theme-json/index.js'
import type WPThemeJsonTailwind from './wp-theme-json-tailwind/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Set options related to sage
     *
     * @public
     */
    sage: Sage

    /**
     * Generate a WordPress `theme.json`
     *
     * @example
     * Use default values:
     *
     * ```js
     * app.themeJson()
     * ```
     *
     * @example
     * Set with an object:
     *
     * ```js
     * app.themeJson({
     *   color: {
     *     palette: []
     *   }
     * })
     * ```
     *
     * @example
     * Set with a callback. Callback supplies a container object.
     *
     * ```js
     * app.themeJson(theme => {
     *   theme.set('color.palette', [])
     *   return theme
     * })
     * ```
     *
     * @example
     * Set with a callback. Pass `true` as a second parameter to
     * specify that you would like to use a raw object rather than
     * a container.
     *
     * ```js
     * app.themeJson(theme => ({
     *   ...theme,
     *   color: {
     *     palette: [],
     *   },
     * }), true)
     * ```
     *
     * @public
     */
    wpjson: ThemeJSON
  }

  interface Modules {
    '@roots/sage': Sage
    '@roots/sage/acorn': Acorn
    '@roots/sage/wp-theme-json': ThemeJSON
    '@roots/sage/acorn-v2-public-path'?: AcornV2PublicPath
    '@roots/sage/wp-theme-json-tailwind'?: WPThemeJsonTailwind
  }

  interface Locations {
    '@resources': string
    '@public': string
    '@fonts': string
    '@images': string
    '@scripts': string
    '@styles': string
    '@views': string
  }
}
