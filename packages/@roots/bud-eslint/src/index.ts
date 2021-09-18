// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for `@roots/entrypoints-webpack-plugin`.
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
 * @extension @packageDocumentation @betaDocumentation
 */

import {Extension, Framework} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import {EslintConfig} from './api'

interface BudEslintWebpackPlugin
  extends Extension.CompilerPlugin<EslintPlugin, Options> {
  api: (app: Framework) => {
    eslint: EslintConfig
  }
}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure eslint options
     */
    eslint: EslintConfig
  }

  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   * @public @override
   */
  interface Plugins {
    'eslint-webpack-plugin': BudEslintWebpackPlugin
  }
}

const BudEslintWebpackPlugin: BudEslintWebpackPlugin = {
  name: 'eslint-webpack-plugin',

  options: ({path, store}) => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage', 'cache', 'eslint.json'),
    context: path('src'),
    cwd: path('project'),
    exclude: store.get('patterns.module'),
    failOnError: true,
  }),

  make: options => new EslintPlugin(options.all()),

  api: app => ({
    eslint: new EslintConfig(app),
  }),

  when: app => app.project.hasPeerDependency('eslint'),
}

export const {name, options, make} = BudEslintWebpackPlugin
