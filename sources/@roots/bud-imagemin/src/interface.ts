import '@roots/bud-framework'
import '@roots/bud-api'

import {Imagemin} from './imagemin'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: Imagemin
  }

  interface Modules {
    '@roots/bud-imagemin': Imagemin
  }
}
