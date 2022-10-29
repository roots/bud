import type {Extension} from '@roots/bud-framework/extension'
import type {Build} from '@roots/bud-framework/services'

import type Vue from './extension.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-vue': Vue
    'vue-loader-plugin': Extension
  }

  interface Loaders {
    vue: Build.Loader
    'vue-style-loader': Build.Loader
  }

  interface Items {
    vue: Build.Item
    'vue-style-loader': Build.Item
  }

  interface Rules {
    vue: Build.Rule.Interface
  }
}
