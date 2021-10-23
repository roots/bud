import {Extension, Framework} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import {EslintConfig} from './eslint.api'

export interface BudEslintWebpackPlugin
  extends Extension.CompilerPlugin<EslintPlugin, Options> {
  api: (app: Framework) => {
    eslint: EslintConfig
  }
}

export const BudEslintWebpackPlugin: BudEslintWebpackPlugin = {
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
