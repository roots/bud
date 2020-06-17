/** Build modules */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

/**
 * Webpack plugins.
 */
const plugins = ({options, inProduction}) => ({
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
    new MiniCssExtractPlugin({
      filename: options.hashed ? `[name].[chunkhash].css` : '[name].css',
    }),
    new CleanWebpackPlugin(),
    new DependencyExtractionPlugin({
      ...options.wpManifest,
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
			writeToFileEmit: true,
			publicPath: inProduction ? `/dist/` : `//${options.dev.host}:${options.dev.port}/dist/`,
    }),
    ...(!inProduction ? [
      new NoEmitOnErrorsPlugin(),
      new WriteFilePlugin(),
      ...(options.hot ? [new HotModuleReplacementPlugin()] : []),
    ]:[]),
  ],
})

module.exports = plugins
