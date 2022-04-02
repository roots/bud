// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Babel transpilation for {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud'
import '@roots/bud-framework'

import {Item, Loader} from '@roots/bud-build'

import {Config} from './babel.config'
import {mixin, name, options, register} from './babel.extension'

interface BabelExtension {
  name: typeof name
  mixin: typeof mixin
  options: typeof options
  register: typeof register
}

declare module '@roots/bud-framework' {
  interface Framework {
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

declare module '@roots/bud' {
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

export {name, mixin, options, register}
