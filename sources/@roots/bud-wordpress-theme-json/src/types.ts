/// <reference path="../../bud/lib/index.d.ts" />

import type {WordPressThemeJSON} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Generate a WordPress `theme.json`
     *
     * @see {@link https://bud.js.org/extensions/sage/theme.json/}
     * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/}
     */
    wpjson: WordPressThemeJSON
  }

  interface Modules {
    '@roots/bud-wordpress-theme-json': WordPressThemeJSON
  }
}
