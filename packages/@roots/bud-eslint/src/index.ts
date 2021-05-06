import './interface'
import {Module} from '@roots/bud-framework'
import Plugin from 'eslint-webpack-plugin'

export const name: Module['name'] = 'eslint-webpack-plugin'

export const options: Module['options'] = app => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cache: true,
  cacheLocation: app.path('storage'),
  quiet: true,
  context: app.path('src', '*'),
})

export const make: Module['make'] = opts =>
  new Plugin(opts.all())
