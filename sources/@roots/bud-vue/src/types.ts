/// <reference types="@roots/bud" />
/// <reference types="@roots/bud-postcss" />
/// <reference types="@roots/bud-sass" />
/// <reference types="@roots/bud-typescript" />

import type {Extension} from '@roots/bud-framework/extension'
import type {Build} from '@roots/bud-framework/services'

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
    vue: Build.Loader
    'vue-style-loader': Build.Loader
  }

  interface Items {
    vue: Build.Item
    'vue-style-loader': Build.Item
  }

  interface Rules {
    vue: Build.Rule
  }
}
