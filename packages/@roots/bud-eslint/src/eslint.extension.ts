import {Extension} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import {EslintConfig} from './eslint.api'

export type BudEslintWebpackPlugin = Extension.CompilerPlugin<
  EslintPlugin,
  Options
>

export const BudEslintWebpackPlugin: BudEslintWebpackPlugin = {
  name: 'eslint-webpack-plugin',

  options: ({path, store}): Options => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage', 'cache', 'eslint.json'),
    context: path('src'),
    cwd: path('project'),
    exclude: store.get('patterns.module'),
    failOnError: true,
    baseConfig: {
      extends: ['eslint:recommended'],
      env: {
        node: true,
        es6: true,
        amd: true,
        browser: true,
      },
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      plugins: ['import', 'prettier'],
      settings: {
        'import/core-modules': [],
        'import/ignore': [
          'node_modules',
          '\\.(coffee|scss|css|less|hbs|svg|json)$',
        ],
      },
      rules: {
        'no-console': 0,
        'comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'ignore',
          },
        ],
      },
    },
  }),

  make: options => new EslintPlugin(options.all()),

  mixin: async app => ({
    eslint: [EslintConfig, app],
  }),

  api: async app => ({
    eslintConfig: app.eslint.config,
  }),
}
