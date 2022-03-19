// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds PostCSS support to Bud

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Item, Loader} from '@roots/bud-build'

import {PostCssConfig} from './bud.postcss'
import {BudPostCssExtension} from './postcss.extension'

declare module '@roots/bud-framework' {
  interface Framework {
    postcss: PostCssConfig
  }

  interface Modules {
    '@roots/bud-postcss': typeof BudPostCssExtension
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
  }
}

export const {name, mixin, register} = BudPostCssExtension
