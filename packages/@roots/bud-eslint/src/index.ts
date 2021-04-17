import './interface'
import {Module} from '@roots/bud-framework'
import Plugin from 'eslint-webpack-plugin'
import formatter from './formatter'

/**
 * Extension name
 */
export const name: Module['name'] = 'eslint-webpack-plugin'

/**
 * Extension options
 */
export const options: Module['options'] = app => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cache: true,
  cacheLocation: app.path('storage'),
  quiet: true,
  formatter,
  context: app.path('src', '*'),
})

/**
 * Extension make
 */
export const make: Module['make'] = opts =>
  new Plugin(opts.all())
