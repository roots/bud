import * as Externals from '@roots/wordpress-externals-webpack-plugin'
import type {Options, Make} from './typings'

export * as api from './externals'

export const make: Make = opts =>
  new Externals.Plugin(opts.getStore())

export const options: Options = {
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
}
