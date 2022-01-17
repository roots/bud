import type {Extension} from '@roots/bud-framework'
import {WordPressExternals} from '@roots/wordpress-externals-webpack-plugin'

/**
 * Adapter for {@link @roots/wordpress-externals-webpack-plugin#Plugin | WordPressExternalsWebpackPlugin}
 *
 * @public
 */
export interface PluginAdapter
  extends Extension.CompilerPlugin<WordPressExternals> {
  name: '@roots/wordpress-externals-webpack-plugin'
  make: () => WordPressExternals
}

/**
 * @public
 */
export const PluginAdapter: PluginAdapter = {
  /**
   * @public
   */
  name: '@roots/wordpress-externals-webpack-plugin',

  /**
   * @public
   */
  make: () => new WordPressExternals(),
}
