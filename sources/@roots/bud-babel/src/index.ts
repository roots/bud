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

import {Item, Loader} from '@roots/bud-build/types'

import {Config} from './config'

declare module '@roots/bud-framework' {
  interface Bud {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  interface Loaders {
    babel: Loader
  }

  interface Items {
    babel: Item
  }
}

import BabelExtension from './extension'
export default BabelExtension
