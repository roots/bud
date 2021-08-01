/**
 * @module @roots/bud-eslint
 */

import './interface'

import {Plugin} from '@roots/bud-framework'
import ESLintWebpackPlugin, {
  Options,
} from 'eslint-webpack-plugin'
const EslintPlugin = require('eslint-webpack-plugin')

import {Eslint} from './api'

/**
 * @const {Plugin} extension
 */
const extension: Plugin<ESLintWebpackPlugin, Options> = {
  name: 'eslint-webpack-plugin',

  options: ({path, store}) => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage', 'cache/eslint.json'),
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

/**
 * @exports default
 * @exports extension
 */
export {extension, extension as default}

/**
 * @exports name
 * @exports options
 * @exports make
 */
export const {name, options, make} = extension

/**
 * @exports Plugin
 */
export type {Plugin}
