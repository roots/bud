import {Extension} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import * as api from './eslint.api'
import {options} from './eslint.options'

export type BudEslintWebpackPlugin = Extension.Plugin<
  EslintPlugin,
  Options
>

export const BudEslintWebpackPlugin: BudEslintWebpackPlugin = {
  label: '@roots/bud-eslint',

  options,

  register: async app => {
    app.eslint = new api.eslint(app)
    app.bindMethod({eslintConfig: app.eslint.config})
  },

  make: options => new EslintPlugin(options.all()),
}
