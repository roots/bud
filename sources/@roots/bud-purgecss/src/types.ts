/// <reference path="../../bud-postcss/lib/index.d.ts" />

import type * as purgeExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: purgeExtension.api
  }

  interface Modules {
    '@roots/bud-purgecss': typeof purgeExtension
  }
}
