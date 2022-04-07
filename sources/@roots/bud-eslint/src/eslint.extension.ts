import {Extension} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import * as api from './eslint.api'
import {options} from './eslint.options'

export type BudEslintWebpackPlugin = Extension.Plugin<
  EslintPlugin,
  Options
>

export const BudEslintWebpackPlugin: BudEslintWebpackPlugin = {
  name: '@roots/bud-eslint',
  mixin: async app => ({
    eslint: [api.eslint, app],
  }),

  api: async app => ({
    eslintConfig: app.eslint.config,
  }),

  options,

  make: options => new EslintPlugin(options.all()),
}
