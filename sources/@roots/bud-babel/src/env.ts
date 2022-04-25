import '@roots/bud-api'
import '@roots/bud-framework'

import {Item, Loader} from '@roots/bud-build'

import {Config} from './config'
import BabelExtension from './extension'

declare module '@roots/bud-framework' {
  interface Bud {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  interface Loaders {
    babel: Loader
  }

  interface Items {
    babel: Item
  }
}
