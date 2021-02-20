import Plugin from 'copy-webpack-plugin'
import {Bud} from '../../..'
import type {Options} from './typings'

export const options: Bud.Module.Options<Options> = {
  patterns: [],
}

export const make: Bud.Module.Make = options =>
  new Plugin(options.all())

export const when: Bud.Module.When = (_, options) => {
  return options.get('patterns').length > 0
}
