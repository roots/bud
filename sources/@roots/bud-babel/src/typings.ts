import '@roots/bud'
import '@roots/bud-framework'

import {Item, Loader} from '@roots/bud-build'

import {Config} from './babel.config'
import {BabelExtension} from './babel.extension'

declare module '@roots/bud-framework' {
  interface Framework {
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
