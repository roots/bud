// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Babel transpilation for {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-framework'

import {Item, Loader} from '@roots/bud-build'

import {Config} from './babel.config'
import {BabelExtension} from './babel.extension'

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

export {BabelExtension as default}
