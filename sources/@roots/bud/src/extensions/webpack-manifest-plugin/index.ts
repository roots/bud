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
  label: 'webpack-manifest-plugin',

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
  make: (options, {hooks}) => {
    return new WebpackManifestPlugin({
      publicPath: hooks
        .filter('build.output.publicPath')
        .replace('auto', ''),
      ...options.all(),
    })
  },

  /**
   * @public
   */
  when: app => app.store.is('features.manifest', true),
}

export const {label, options, make, when} = BudWebpackManifestPlugin
