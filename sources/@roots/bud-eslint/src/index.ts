// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Provides eslint integration for Bud.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import * as api from './eslint.api'
import {BudEslintWebpackPlugin} from './eslint.extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: api.eslint
    eslintConfig: api.eslint['config']
  }

  interface Modules {
    'eslint-webpack-plugin': BudEslintWebpackPlugin
  }
}

export const {label, options, register, make} = BudEslintWebpackPlugin
