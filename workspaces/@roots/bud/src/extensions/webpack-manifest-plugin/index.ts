import {WebpackManifestPlugin} from './webpack-manifest-plugin.dependencies'
import type {Plugin} from './webpack-manifest-plugin.interface'

/**
 * Webpack Manifest Plugin adapter
 *
 * @public
 */
const BudWebpackManifestPlugin: Plugin = {
  /**
   * @public
   */
  name: 'webpack-manifest-plugin',

  /**
   * @public
   */
  options: () => ({
    fileName: 'manifest.json',
    writeToFileEmit: true,
  }),

  /**
   * @public
   */
  make: (options, {store}) => {
    return new WebpackManifestPlugin({
      publicPath: store.get('location.publicPath'),
      ...options.all(),
    })
  },

  /**
   * @public
   */
  when: app => app.store.is('features.manifest', true),
}

export const {name, options, make, when} =
  BudWebpackManifestPlugin
