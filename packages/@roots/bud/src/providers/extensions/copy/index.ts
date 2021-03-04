import Plugin from 'copy-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const name: Module['name'] = 'webpack-copy-plugin'

export const options: Module['options'] = {patterns: []}

export const make: Module['make'] = options =>
  new Plugin(options.all())

export const when: Module['when'] = (_, options) =>
  options.get('patterns').length > 0
