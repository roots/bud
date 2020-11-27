import {Extension} from '@roots/bud-typings'
import * as Externals from '@roots/wordpress-externals-webpack-plugin'

export * as api from './externals'

export const make: Extension.Make = opts =>
  new Externals.Plugin(opts.getStore())

export const options: Extension.RawOptions<Externals.Options> = {
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
}
