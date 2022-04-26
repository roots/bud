// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add Vue support
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud

 * @packageDocumentation
 */

import {Build, Extension} from '@roots/bud-framework/types'

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

import Vue from './extension'
export default Vue
