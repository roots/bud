/**
 * @module @roots/bud-stylelint
 */

import './interface'

import type {Framework, Module} from '@roots/bud-framework'

const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

/**
 * @const {Module} extension
 */
const extension: Module &
  Framework.Extensions['stylelint-webpack-plugin'] = {
  name: 'stylelint-webpack-plugin',
  options: app => ({
    context: app.path('project'),
  }),
  make: opts => new StylelintWebpackPlugin(opts.all()),
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
