/// <reference types="@roots/bud" />

import type {WordPressThemeJSON} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Generate a WordPress `theme.json`
     *
     * @see {@link https://bud.js.org/extensions/sage/theme.json/}
     * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/}
     */
    wpjson: {
      app: WordPressThemeJSON[`app`]
      settings: WordPressThemeJSON[`settings`]
      get: WordPressThemeJSON[`get`]
      getOptions: WordPressThemeJSON[`getOptions`]
      set: WordPressThemeJSON[`set`]
      setOptions: WordPressThemeJSON[`setOptions`]
      enable: WordPressThemeJSON[`enable`]
      useTailwindColors?: (
        value?: boolean,
        extendOnly?: boolean,
      ) => Bud[`wpjson`]
      useTailwindFontFamily?: (
        value?: boolean,
        extendOnly?: boolean,
      ) => Bud[`wpjson`]
      useTailwindFontSize?: (
        value?: boolean,
        extendOnly?: boolean,
      ) => Bud[`wpjson`]
    }
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': Bud[`wpjson`]
  }
}
