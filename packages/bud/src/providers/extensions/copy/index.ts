import Plugin from 'copy-webpack-plugin'
import type {Options} from './typings'
import type {Module} from '@roots/bud-typings'

export const options: Module.Options<Options> = {}

export const make: Module.Make<Plugin, Options> = options =>
  new Plugin(options.all()) as any

export const when: Module.When = (_, options) =>
  options.has('patterns') && !options.isNull('patterns')
