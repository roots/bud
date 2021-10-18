import {WebpackManifestPlugin} from './webpack-manifest-plugin.dependencies'
import type {Plugin} from './webpack-manifest-plugin.interface'
/**
 * Webpack Manifest Plugin adapter
 *
 * @public
 */
const BudWebpackManifestPlugin: Plugin = {
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
