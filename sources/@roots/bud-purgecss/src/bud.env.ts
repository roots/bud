import '@roots/bud-postcss'

import {Extension} from '@roots/bud-framework'

import * as purge from './purge.interface'

declare module '@roots/bud-framework' {
  interface Bud {
    purgecss: purge.api
  }

  interface Modules {
    '@roots/bud-purgecss': Extension.Module
  }
}
