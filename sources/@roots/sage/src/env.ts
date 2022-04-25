// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

import '@roots/bud-api'
import '@roots/bud-preset-wordpress'
import '@roots/bud-tailwindcss'
import '@roots/bud-framework'

import Sage from './sage.preset'
import * as themeJson from './theme/api/themeJson'
import * as useTailwindColors from './theme/api/useTailwindColors'
import ThemeJSON from './theme/extension'

declare module '@roots/bud-framework' {
  interface Bud {
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
    themeJson: themeJson.facade

    /**
     * Use extended tailwind colors as theme.json colors
     *
     * @example
     * app.useTailwindColors()
     *
     * @public
     */
    useTailwindColors: useTailwindColors.facade
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

  interface Modules {
    '@roots/sage': Sage
    'wp-theme-json': ThemeJSON
  }
}
