// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds vue sfc support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud

 * @packageDocumentation
 */

import '@roots/bud-api'

import {Item, Loader, Rule} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'

import {VueExtension} from './vue.extension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-vue': Extension.Module
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

export const {name, boot} = VueExtension
