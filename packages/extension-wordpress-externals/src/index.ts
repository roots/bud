import * as Externals from '@roots/wordpress-externals-webpack-plugin'
import type {Bud} from '@roots/bud'

// extension identifier
export const name = '@roots/wordpress-externals-webpack-plugin'

// bud.wordpressExternals fn
export * as api from './api'

// bud.wordpressExternals interface
export * from './interfaces'

// @roots/wordpress-externals-webpack-plugin
export const make: Bud.Module.Make<
  Externals.Plugin,
  Externals.Options
> = opts => new Externals.Plugin(opts.all())

// @roots/wordpress-externals-webpack-plugin options
export const options: Bud.Module.Options<Externals.Options> = {
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
}
