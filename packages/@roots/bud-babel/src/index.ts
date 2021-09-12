// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds [Babel transpiler](https://github.com/babel/babel)
 * support to {@link @roots/bud# | @roots/bud}.
 *
 * - [Babel](https://babeljs.io/) is a JavaScript compiler that can transpile ES2015+ code to ES5.
 *
 * - This extensions comes with a set of preloaded presets and plugins.
 *
 * - You may override the defaults using the {@link Config.setPresets} and {@link Config.setPlugins} methods.
 *
 * - You may also override the default options for a plugin or preset using the {@link Config.setPluginOptions} and {@link Config.setPresetOptions} methods.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @public @extension @packageDocumentation
 */

import type {Item, Loader} from '@roots/bud-build'

import {BudBabelExtension} from './BudBabelExtension'
import {Config} from './Config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './constants'

declare module '@roots/bud-framework' {
  interface Framework {
    babel: Config
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': typeof BudBabelExtension
    }

    interface Loaders {
      babel: Loader
    }

    interface Items {
      babel: Item
    }
  }
}

export {Config}

export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

export const {name, register, boot} = BudBabelExtension
