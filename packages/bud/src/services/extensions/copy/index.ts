import Plugin from 'copy-webpack-plugin'
import {Index, Module} from '@roots/bud-typings'

export const options: Module.Options<Index<any>> = () => ({
  patterns: null,
})

export const make: Module.Make<Index<any>, Plugin> = options =>
  new Plugin(options.all())

export const when: Module.When = (_, options) =>
  options.has('patterns')
