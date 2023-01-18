/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-preset-wordpress" />
/// <reference types="@roots/bud-entrypoints" />

import type Acorn from '../acorn/index.js'
import type AcornV2PublicPath from '../acorn-v2-public-path/index.js'
import type Sage from '../sage/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Set options related to sage
     *
     * @see {@link https://bud.js.org/extensions/sage/}
     */
    sage: Sage
  }

  interface Modules {
    '@roots/sage': Sage
    '@roots/sage/acorn': Acorn
    '@roots/sage/acorn-v2-public-path'?: AcornV2PublicPath
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
