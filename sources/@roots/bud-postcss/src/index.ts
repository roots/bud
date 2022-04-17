// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds PostCSS support to Bud

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Item, Loader} from '@roots/bud-build'

import {PostCssConfig} from './bud.postcss'
import {BudPostCssExtension} from './postcss.extension'

declare module '@roots/bud-framework' {
  interface Bud {
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

export const {label, register} = BudPostCssExtension
