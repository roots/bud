/** Build modules */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const {isProduction} = require('./util')

/**
 * Webpack plugins.
 */
const plugins = ({dev}) => ({
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].[chunkhash].css`,
    }),
    new CleanWebpackPlugin(),
    new DependencyExtractionPlugin({
      useDefaults: true,
      injectPolyfill: false,
      outputFormat: 'json',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
			writeToFileEmit: true,
			publicPath: isProduction ? `/dist/` : `//${dev.host}:${dev.port}/dist/`,
    }),
    ...(!isProduction ? [
      new HotModuleReplacementPlugin(),
      new NoEmitOnErrorsPlugin(),
      new WriteFilePlugin(),
    ]:[]),
  ],
})

module.exports = plugins
