import type {Build, Extension} from '@roots/bud-framework'

import type Vue from './extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-vue': Vue
    'vue-loader-plugin': Extension
  }

  interface Loaders {
    vue: Build.Loader
    'vue-style': Build.Loader
  }

  interface Items {
    vue: Build.Item
    'vue-style': Build.Item
  }

  interface Rules {
    vue: Build.Rule
  }
}
