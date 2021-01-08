import * as Externals from '@roots/externals-webpack-plugin'
import type {Options, Make} from './typings'

export * as api from './externals'

export const make: Make = opts =>
  new Externals.Plugin(opts.all())

export const options: Options = {
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
}
