import '@roots/bud-babel'

import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': Extension.Module<null>
  }
}