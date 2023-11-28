// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @roots/sage
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 */

import type {Item, Loader, Rule} from '@roots/bud-build'
import type {PublicExtensionApi} from '@roots/bud-framework/extension'
import type BudPresetWordPress from '@roots/bud-preset-wordpress/extension'
import type Acorn from '@roots/sage/acorn'
import type AcornV2PublicPath from '@roots/sage/acorn-v2-public-path'
import type BladeLoader from '@roots/sage/blade-loader'

import Sage from '@roots/sage/sage'

interface SagePublicAPI extends PublicExtensionApi<Sage> {
  /**
   * ## Configure Acorn concerns
   *
   * @see {@link Acorn}
   * @see {@link https://bud.js.org/extensions/sage#acorn-compatibility}
   */
  acorn: PublicExtensionApi<Acorn>

  /**
   * ## Configure handling of Blade template modules
   *
   * @see {@link BladeLoader}
   * @see {@link https://bud.js.org/extensions/sage/blade-assets}
   */
  blade: PublicExtensionApi<BladeLoader>

  /**
   * ## Enable or disable Blade template processing
   *
   * @remarks
   * This method is a convenience wrapper for the {@link BladeLoader.enable} method.
   *
   * @example
   * ```js
   * bud.sage.processBladeTemplates()
   * ```
   *
   * @example
   * ```js
   * bud.sage.processBladeTemplates(false)
   * ```
   *
   * @example
   * ```js
   * bud.when(bud.isProduction, bud.sage.processBladeTemplates)
   * ```
   *
   * @see {@link https://bud.js.org/extensions/sage/blade-assets}
   */
  processBladeTemplates: Sage[`processBladeTemplates`]

  /**
   * This function should be removed from your configuration file.
   * It doesn't do anything and will be removed in a future release.
   *
   * @deprecated
   */
  setAcornVersion: Sage[`setAcornVersion`]
}

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * ## Sage configuration
     *
     * @see {@link https://bud.js.org/extensions/sage}
     * @see {@link https://docs.roots.io/sage/10.x/compiling-assets}
     */
    sage: SagePublicAPI
  }

  interface Modules {
    '@roots/bud-preset-wordpress': BudPresetWordPress
    '@roots/sage': Sage
    '@roots/sage/acorn': Acorn
    '@roots/sage/acorn-v2-public-path'?: AcornV2PublicPath
    '@roots/sage/blade-loader': BladeLoader
  }

  interface Locations {
    '@fonts': string
    '@images': string
    '@public': string
    '@resources': string
    '@scripts': string
    '@styles': string
    '@views': string
  }

  interface Loaders {
    '@roots/blade-loader': Loader
  }

  interface Items {
    '@roots/blade-loader': Item
  }

  interface Rules {
    blade: Rule
  }
}

export {Sage as default}
export type {SagePublicAPI}
