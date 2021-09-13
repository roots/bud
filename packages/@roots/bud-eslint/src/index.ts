// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The `bud-entrypoints` package provides {@link BudEntrypointsPlugin}, an adapter
 * for `@roots/entrypoints-webpack-plugin`.
 *
 * @packageDocumentation
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
