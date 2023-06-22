import type {Item, Loader, Rule} from '@roots/bud-framework'
import type {Extension} from '@roots/bud-framework/extension'

import type Vue from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    vue: Vue
  }

  interface Modules {
    '@roots/bud-vue': Vue
    'vue-loader-plugin': Extension
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
