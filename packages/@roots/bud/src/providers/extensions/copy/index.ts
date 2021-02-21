import Plugin from 'copy-webpack-plugin'
import {Bud} from '../../..'

export const name = `copy-webpack-plugin`

export const options = {patterns: []}

export const make: Bud.Module.Make = options =>
  new Plugin(options.all())

export const when: Bud.Module.When = (_, options) => {
  return options.get('patterns').length > 0
}
