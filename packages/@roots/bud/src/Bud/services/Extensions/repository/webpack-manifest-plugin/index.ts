import type {Extension} from '@roots/bud-framework'
import {
  ManifestPluginOptions as Options,
  WebpackManifestPlugin,
} from 'webpack-manifest-plugin'

/**
 * {@inheritDoc BudWebpackManifestPlugin}
 * @public
 */
interface BudWebpackManifestPlugin
  extends Extension.CompilerPlugin<{apply: any}, Options> {}

/**
 * Webpack Manifest Plugin adapter
 *
 * @public
 */
const BudWebpackManifestPlugin: BudWebpackManifestPlugin = {
  /**
   * {@inheritDoc @roots/bud-framework#Extension.name}
   * @public
   */
  name: 'webpack-manifest-plugin',

  /**
   * {@inheritDoc @roots/bud-framework#Extension.options}
   * @public
   */
  options: ({store}) =>
    store.get('extension.webpackManifestPlugin'),

  /**
   * {@inheritDoc @roots/bud-framework#Extension.make}
   * @public
   */
  make: (options, {store}) => {
    return new WebpackManifestPlugin({
      publicPath: store.get('location.publicPath'),
      ...options.all(),
    })
  },

  /**
   * {@inheritDoc @roots/bud-framework#Extension.when}
   * @public
   */
  when: app => app.store.isTrue('manifest'),
}

export const {name, options, make, when} =
  BudWebpackManifestPlugin
