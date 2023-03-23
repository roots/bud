import '@roots/bud/types'

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {WordPressThemeJSON} from './extension.js'

/**
 * Generate a WordPress `theme.json`
 *
 * @see {@link https://bud.js.org/extensions/sage/theme.json/}
 * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/}
 */
interface WPJSONApi extends PublicExtensionApi<WordPressThemeJSON> {
  /**
   * ## bud.wpjson.settings
   *
   * Define `theme.json` settings using an options object or callback
   */
  settings: WordPressThemeJSON[`settings`]

  /**
   * ## bud.wpjson.useTailwindColors
   *
   * Source `theme.json` color values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindColors?: (value?: boolean, extendOnly?: boolean) => this

  /**
   * ## bud.wpjson.useTailwindFontFamily
   *
   * Source `theme.json` fontFamily values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindFontFamily?: (value?: boolean, extendOnly?: boolean) => this

  /**
   * ## bud.wpjson.useTailwindFontSize
   *
   * Source `theme.json` fontSize values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindFontSize?: (value?: boolean, extendOnly?: boolean) => this
}

declare module '@roots/bud-framework' {
  interface Bud {
    wpjson: WPJSONApi
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': WPJSONApi
  }
}
