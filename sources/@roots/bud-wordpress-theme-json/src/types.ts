/// <reference types="@roots/bud" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {WordPressThemeJSON} from './extension.js'

interface WPJSONApi extends PublicExtensionApi<WordPressThemeJSON> {
  settings: WordPressThemeJSON[`settings`]
  useTailwindColors?: (value?: boolean, extendOnly?: boolean) => WPJSONApi
  useTailwindFontFamily?: (
    value?: boolean,
    extendOnly?: boolean,
  ) => WPJSONApi
  useTailwindFontSize?: (
    value?: boolean,
    extendOnly?: boolean,
  ) => WPJSONApi
}

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Generate a WordPress `theme.json`
     *
     * @see {@link https://bud.js.org/extensions/sage/theme.json/}
     * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/}
     */
    wpjson: WPJSONApi
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': WPJSONApi
  }
}
