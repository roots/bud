// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * Add stylelint support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @extension @packageDocumentation @betaDocumentation
 */

import type {Extension, Framework} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import StylelintWebpackPlugin, {
  Options,
} from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Extensions {
    'stylelint-webpack-plugin': BudStylelintWebpackPlugin
  }
}

interface BudStylelintWebpackPlugin
  extends Extension.CompilerPlugin<
    StylelintWebpackPlugin,
    Options
  > {
  name: 'stylelint-webpack-plugin' &
    Extension.CompilerPlugin['name']
  options(
    app: Framework,
  ): Extension.CompilerPlugin['options'] & Options
  make(options: Container<Options>): StylelintWebpackPlugin
}

const BudStylelintWebpackPlugin: BudStylelintWebpackPlugin = {
  name: 'stylelint-webpack-plugin',

  options: app => ({
    context: app.path('src'),
  }),

  make: opts => new StylelintWebpackPlugin(opts.all()),
}

export const {name, options, make} = BudStylelintWebpackPlugin
