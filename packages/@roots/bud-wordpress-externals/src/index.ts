import './interface'
import {
  Plugin,
  WordPressExternals,
} from '@roots/wordpress-externals-webpack-plugin'
import type {Module} from '@roots/bud-framework'

export const name: Module['name'] =
  '@roots/wordpress-externals-webpack-plugin'

export const make: Module.Make<
  Plugin,
  WordPressExternals.Options
> = () => new Plugin()
