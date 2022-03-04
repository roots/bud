// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * This preset configures Bud for use with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @packageDocumentation
 */

import {Sage} from './sage.preset'
import * as themeJson from './theme/api/themeJson'
import * as useTailwindColors from './theme/api/useTailwindColors'
import * as ThemeJSON from './theme/extension'
import * as tailwindTheme from './theme/tailwind.adapter'

declare module '@roots/bud-framework' {
  interface Framework {
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

  interface Modules {
    '@roots/sage': typeof Sage
    'wp-theme-json': ThemeJSON.Extension
  }
}

export const {name, boot} = Sage
export {tailwindTheme, ThemeJSON}
