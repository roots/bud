import type {Extension} from '@roots/bud-framework'
import {WordPressExternals} from '@roots/wordpress-externals-webpack-plugin'

/**
 * Adapter for {@link @roots/wordpress-externals-webpack-plugin#Plugin | WordPressExternalsWebpackPlugin}
 *
 * @public
 */
export interface PluginAdapter
  extends Extension.CompilerPlugin<WordPressExternals> {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.name}
   *
   * @public
   */
  name: '@roots/wordpress-externals-webpack-plugin'

  /**
   * {@inheritDoc @roots/bud-framework#Extension.CompilerPlugin.make}
   *
   * @public
   */
  make: () => WordPressExternals
}

/**
 * {@inheritDoc PluginAdapter}
 *
 * @public
 */
export const PluginAdapter: PluginAdapter = {
  /**
   * {@inheritDoc PluginAdapter.name}
   *
   * @public
   */
  name: '@roots/wordpress-externals-webpack-plugin',

  /**
   * {@inheritDoc PluginAdapter.make}
   *
   * @public
   */
  make: () => new WordPressExternals(),
}
