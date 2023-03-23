import '@roots/bud/types'
import '@roots/bud-preset-wordpress/types'

import type {Item} from '@roots/bud-build/item'
import type {Loader} from '@roots/bud-build/loader'
import type {Rule} from '@roots/bud-build/rule'
import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type Acorn from '../acorn/index.js'
import type AcornV2PublicPath from '../acorn-v2-public-path/index.js'
import type BladeLoader from '../blade-loader/index.js'
import type Sage from '../sage/index.js'

interface SagePublicAPI extends PublicExtensionApi<Sage> {
  acorn: PublicExtensionApi<Acorn>
  setAcornVersion: Sage[`setAcornVersion`]
}

declare module '@roots/bud-framework' {
  interface Bud {
    sage: SagePublicAPI
  }

  interface Modules {
    '@roots/sage': Sage
    '@roots/sage/acorn': Acorn
    '@roots/sage/acorn-v2-public-path'?: AcornV2PublicPath
    '@roots/sage/blade-loader': BladeLoader
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
