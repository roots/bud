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
  acorn: PublicExtensionApi<Acorn>
  setAcornVersion: Sage[`setAcornVersion`]
}

declare module '@roots/bud-framework' {
  interface Bud {
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
