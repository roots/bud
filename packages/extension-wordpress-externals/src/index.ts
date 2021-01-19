import {Plugin} from '@roots/wordpress-externals-webpack-plugin'
import {WordPressExternals} from '@roots/wordpress-externals-webpack-plugin'
import type {Bud} from '@roots/bud'

// extension identifier
export const name = '@roots/wordpress-externals-webpack-plugin'

// @roots/wordpress-externals-webpack-plugin
export const make: Bud.Module.Make<
  Plugin,
  WordPressExternals.Options
> = () => new Plugin()
