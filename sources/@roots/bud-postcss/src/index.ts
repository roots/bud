// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds PostCSS support to Bud

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Build} from '@roots/bud-framework'
import type {Plugin, Processor} from 'postcss'

import BudPostCss from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    postcss: BudPostCss
  }

  interface Modules {
    '@roots/bud-postcss': BudPostCss
  }

  interface Loaders {
    postcss: Build.Loader
  }

  interface Items {
    postcss: Build.Item
  }

  namespace Registry {
    interface Sync {
      'postcss.plugins': () => Array<[string | Plugin | Processor, any?]>
    }
  }
}

export default BudPostCss
