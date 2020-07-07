/** Build modules */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  LimitChunkCountPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  ProvidePlugin,
  optimize,
} = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

/**
 * Webpack plugins.
 */
const plugins = ({options, features, paths}) => {
  const config = {
    plugins: [
      new FixStyleOnlyEntriesPlugin({
        silent: true,
      }),
      new MiniCssExtractPlugin({
        filename: options.hashed
          ? `[name].[chunkhash].css`
          : '[name].css',
      }),
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'manifest.json',
        writeToFileEmit: true,
        publicPath: `${paths.public}/`,
      }),
    ],
  }

  features.dependencyManifest &&
    config.plugins.push(
      new DependencyExtractionPlugin({
        ...options.dependencyManifest,
      }),
    )

  options.copy.patterns.length > 0 &&
    config.plugins.push(
      new CopyPlugin({
        patterns: options.copy.patterns,
      }),
    )

  options.splitting.disabled &&
    config.plugins.push(
      new LimitChunkCountPlugin({maxChunks: 1}),
    )

  !options.splitting.disabled &&
    options.splitting.maxChunks &&
    config.plugins.push(
      new LimitChunkCountPlugin({
        maxChunks: options.splitting.maxChunks,
      }),
    )

  options.auto &&
    config.plugins.push(new ProvidePlugin(options.auto))

  features.hot &&
    config.plugins.push(new HotModuleReplacementPlugin())

  features.browserSync == true &&
    features.debug == false &&
    config.plugins.push(
      new BrowserSyncPlugin({
        host: options.browserSync.host,
        port: options.browserSync.port,
        proxy: options.browserSync.proxy,
      }),
    )

  !options.inProduction &&
    (() => {
      config.plugins.push(new NoEmitOnErrorsPlugin())
      config.plugins.push(new WriteFilePlugin())
    })()

  return config
}

module.exports = plugins
