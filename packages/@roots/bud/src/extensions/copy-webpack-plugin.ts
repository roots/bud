import {Framework} from '@roots/bud-framework'
import Plugin from 'copy-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const name: Module['name'] = 'webpack-copy-plugin'

export const options: Module['options'] = (app: Framework) => ({
  patterns: [],
})

export const make: Module['make'] = options =>
  new Plugin(options.all())

export const when: Module.When = (_app, options) =>
  options.has('patterns') && options.get('patterns')?.length > 0
