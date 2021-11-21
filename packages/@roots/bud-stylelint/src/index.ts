// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Add stylelint support to Bud
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

import type {Extension} from '@roots/bud-framework'
import StylelintWebpackPlugin, {
  Options,
} from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-stylelint': Extension.CompilerPlugin<
      StylelintWebpackPlugin,
      Options
    >
  }
}

const BudStylelintWebpackPlugin: Extension.CompilerPlugin<
  StylelintWebpackPlugin,
  Options
> = {
  name: 'stylelint-webpack-plugin',

  options(app) {
    return {
      context: app.path('src'),
    }
  },

  make(options) {
    return new StylelintWebpackPlugin(options.all())
  },
}

export const {name, options, make} = BudStylelintWebpackPlugin
