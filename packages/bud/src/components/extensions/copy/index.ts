import Plugin from 'copy-webpack-plugin'
import {RawOptions, Make, When} from './typings'

export const options: RawOptions = {
  patterns: [],
}
export const make: Make = opt => new Plugin(opt.getStore())
export const when: When = (_, opt) =>
  opt?.has('patterns') && opt.get('patterns').length > 0
