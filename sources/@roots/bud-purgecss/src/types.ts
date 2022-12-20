/// <reference path="../../bud-postcss/lib/index.d.ts" />

import type {purgecss} from './api.js'
import type * as purgeExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: typeof purgecss
  }

  interface Modules {
    '@roots/bud-purgecss': typeof purgeExtension
  }
}
