// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds [Babel transpiler](https://github.com/babel/babel)
 * support to {@link @roots/bud# | @roots/bud}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @public @extension @packageDocumentation
 */

import {Item, Loader} from '@roots/bud-build'

import {BudBabelExtension} from './BudBabelExtension'
import {Config} from './Config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './constants'

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

export {Config}

export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

export const {name, register, boot} = BudBabelExtension
