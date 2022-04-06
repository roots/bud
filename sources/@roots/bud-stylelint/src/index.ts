// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add stylelint support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import StylelintWebpackPlugin, {Options} from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-stylelint': Extension.Plugin<
      StylelintWebpackPlugin,
      Options
    >
  }
}

const BudStylelintWebpackPlugin: Extension.Plugin<
  StylelintWebpackPlugin,
  Options
> = {
  name: 'stylelint-webpack-plugin',

  options(app) {
    return {
      context: app.path('@src'),
    }
  },

  make(options) {
    return new StylelintWebpackPlugin(options.all())
  },
}

export const {name, options, make} = BudStylelintWebpackPlugin
