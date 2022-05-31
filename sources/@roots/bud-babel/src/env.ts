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

import type {Build} from '@roots/bud-framework'

import type {Config} from './config.js'
import type BabelExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  interface Loaders {
    babel: Build.Loader
  }

  interface Items {
    babel: Build.Item
  }
}
