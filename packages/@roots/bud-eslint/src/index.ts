import './interface'

import {WebpackPlugin} from '@roots/bud-framework'
import ESLintWebpackPlugin, {
  Options,
} from 'eslint-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'

import {Eslint} from './api'

const extension: WebpackPlugin<ESLintWebpackPlugin, Options> = {
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
    eslint: new Eslint(app),
  }),

  when: app => app.discovery.hasPeerDependency('eslint'),
}

export const {name, options, make} = extension
