/// <reference path="../../../bud/lib/index.d.ts" />
/// <reference path="../../../bud-preset-wordpress/lib/index.d.ts" />

import type Acorn from '@roots/sage/acorn'
import type AcornV2PublicPath from '@roots/sage/acorn-v2-public-path'
import type Sage from '@roots/sage/sage'

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
