import * as Externals from '@roots/wordpress-externals-webpack-plugin'
import type {Module} from '@roots/bud-typings'

export * as api from './externals'

export const make: Module.Make<
  Externals.Plugin,
  Externals.Options
> = opts => new Externals.Plugin(opts.all())

export const options: Module.Options<Externals.Options> = {
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
}
