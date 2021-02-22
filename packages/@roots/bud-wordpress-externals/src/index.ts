import {
  Plugin,
  WordPressExternals,
} from '@roots/wordpress-externals-webpack-plugin'
import {Module} from '@roots/bud-typings'

// extension identifier
export const name: Module['name'] =
  '@roots/wordpress-externals-webpack-plugin'

// @roots/wordpress-externals-webpack-plugin
export const make: Module.Make<
  Plugin,
  WordPressExternals.Options
> = () => new Plugin()
