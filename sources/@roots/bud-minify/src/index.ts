// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 */

import type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
} from '@roots/bud-minify/minify-css'
import type {
  BudMinimizeJS,
  BudMinimizeJSPublicInterface,
} from '@roots/bud-minify/minify-js'

import BudMinimize from '@roots/bud-minify/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * ## bud.minify
     *
     * @deprecated Use {@link bud.minimizers} instead.
     */
    minify: BudMinimize

    /**
     * ## bud.minimizeCss
     *
     * @deprecated Use {@link bud.minimizers.css} instead.
     */
    minimizeCss: BudMinimizeCSSPublicInterface

    /**
     * ## bud.minimizers
     *
     * Configure minimizer options for CSS and JS modules
     *
     * @see {@link Bud.minimizers.js}
     * @see {@link Bud.minimizers.css}
     */
    minimizers: BudMinimize

    /**
     * ## bud.terser
     *
     * @deprecated Use {@link bud.minimizers.js} instead.
     */
    terser: BudMinimizeJSPublicInterface
  }

  interface Modules {
    '@roots/bud-minify': BudMinimize
    '@roots/bud-minify/minify-css': BudMinimizeCSS
    '@roots/bud-minify/minify-js': BudMinimizeJS
  }
}

export {BudMinimize as default}
