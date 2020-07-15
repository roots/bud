import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'

/**
 * Base plugins
 *
 * @typedef {function (paths: bud.paths, features: bud.features) => {array}} base
 * @param {paths} paths
 * @param {options} options
 * @return {array}
 */
const base = (paths, features) => [
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

export {base}
