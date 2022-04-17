import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'

import {Vue} from './vue.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-vue': Vue
    'vue-loader-plugin': Extension.Module
  }

  interface Loaders {
    vue: Loader
    'vue-style': Loader
  }

  interface Items {
    vue: Item
    'vue-style': Item
  }

  interface Rules {
    vue: Rule
  }
}
