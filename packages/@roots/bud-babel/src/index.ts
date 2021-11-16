// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds Babel
 * transpilation to {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import {Item, Loader} from '@roots/bud-build'

import {Config} from './babel.config'
import * as BudBabelExtension from './babel.extension'

declare module '@roots/bud-framework' {
  interface Framework {
    babel: Config
  }

  interface Modules {
    '@roots/bud-babel': typeof BudBabelExtension
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
    '@roots/bud-babel': typeof BudBabelExtension
  }

  interface Loaders {
    babel: Loader
  }

  interface Items {
    babel: Item
  }
}

export const {name, mixin, register} = BudBabelExtension
