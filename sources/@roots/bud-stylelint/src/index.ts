// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add stylelint support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Extension} from '@roots/bud-framework'
import StylelintWebpackPlugin, {Options} from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-stylelint': BudStylelintWebpackPlugin
  }
}

type BudStylelintWebpackPlugin = Extension.Module<
  Options,
  StylelintWebpackPlugin
>

const BudStylelintWebpackPlugin: BudStylelintWebpackPlugin = {
  label: 'stylelint-webpack-plugin',

  options(app) {
    return {
      context: app.path('@src'),
    }
  },

  make(options) {
    return new StylelintWebpackPlugin(options.all())
  },
}

export const {label, options, make} = BudStylelintWebpackPlugin
