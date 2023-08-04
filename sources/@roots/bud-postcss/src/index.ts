// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds PostCSS support to Bud

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type Item from '@roots/bud-build/item'
import type Loader from '@roots/bud-build/loader'

import {
  default as BudPostCss,
  type BudPostCssPublicInterface,
} from '@roots/bud-postcss/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCssPublicInterface
  }

  interface Loaders {
    postcss: Loader
  }

  interface Items {
    postcss: Item
  }

  interface Modules {
    '@roots/bud-postcss': BudPostCssPublicInterface
  }
}

export default BudPostCss
