/// <reference path="../../bud/lib/index.d.ts" />
/// <reference path="../../bud-preset-wordpress/lib/index.d.ts" />
/// <reference path="../../bud-tailwindcss/lib/index.d.ts" />

import type Acorn from './acorn/index.js'
import type AcornV2PublicPath from './acorn-v2-public-path/index.js'
import type Sage from './sage/index.js'
import type ThemeJSON from './wp-theme-json/index.js'
import type WPThemeJsonTailwind from './wp-theme-json-tailwind/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Set options related to sage
     *
     * @see {@link https://bud.js.org/extensions/sage/}
     */
    sage: Sage

    /**
     * Generate a WordPress `theme.json`
     *
     * @see {@link https://bud.js.org/extensions/sage/theme.json/}
     * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/}
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
