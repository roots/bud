import type {Extensions} from '@roots/bud-framework'
import {WordPressExternals} from '@roots/wordpress-externals-webpack-plugin'

/**
 * Adapter for {@link @roots/wordpress-externals-webpack-plugin#Plugin | WordPressExternalsWebpackPlugin}
 *
 * @public
 */
export interface PluginAdapter
  extends Extensions.Plugin<WordPressExternals> {
  label: '@roots/wordpress-externals-webpack-plugin'
  make: () => WordPressExternals
}

/**
 * @public
 */
export const PluginAdapter: PluginAdapter = {
  /**
   * @public
   */
  label: '@roots/wordpress-externals-webpack-plugin',

  /**
   * @public
   */
  make: () => new WordPressExternals(),
}
