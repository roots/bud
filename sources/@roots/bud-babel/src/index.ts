// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Babel transpiler support
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Config} from './config.js'
import BabelExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  namespace Build {
    interface Loaders {
      babel: Build.Loader
    }

    interface Items {
      babel: Build.Item
    }
  }
}

export default BabelExtension
