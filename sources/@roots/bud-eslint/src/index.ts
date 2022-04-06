// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Provides eslint integration for Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import * as api from './eslint.api'
import {BudEslintWebpackPlugin} from './eslint.extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: api.eslint
  }

  interface Plugins {
    'eslint-webpack-plugin': BudEslintWebpackPlugin
  }
}

export const {name, options, make, mixin} = BudEslintWebpackPlugin
