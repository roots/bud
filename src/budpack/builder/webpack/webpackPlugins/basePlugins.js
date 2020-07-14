import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin'

/**
 * Base plugins
 *
 * @typedef {function (paths: bud.paths, features: bud.features) => {array}} basePlugins
 * @param {paths} paths
 * @param {options} options
 * @return {array}
 */
const basePlugins = (paths, features) => [
  new ModuleNotFoundPlugin(paths.project),
  new FixStyleOnlyEntriesPlugin({
    silent: true,
  }),
  new MiniCssExtractPlugin({
    filename: features.hash
      ? `[name].[hash:8].css`
      : '[name].css',
  }),
  new CleanWebpackPlugin(),
  new ManifestPlugin({
    fileName: 'manifest.json',
    writeToFileEmit: true,
    publicPath: `${paths.public}/`,
  }),
]

export {basePlugins}
