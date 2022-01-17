// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Provides eslint integration for Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import * as api from './eslint.api'
import {BudEslintWebpackPlugin} from './eslint.extension'

declare module '@roots/bud-framework' {
  interface Framework {
    eslint: api.eslint
  }

  interface Plugins {
    'eslint-webpack-plugin': BudEslintWebpackPlugin
  }
}

export const {name, options, make, mixin} = BudEslintWebpackPlugin
