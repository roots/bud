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
     * @public
     */
    themeJson: themeJson.facade
    /**
     * Emit WordPress `theme.json` color settings using values sourced from
     * `tailwind.config.js` (theme.extend.colors)
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
