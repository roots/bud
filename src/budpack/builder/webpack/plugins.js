const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  DefinePlugin,
  LimitChunkCountPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  ProvidePlugin,
} = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

/**
 * Base plugins
 * @typedef {function (paths: bud.paths, options: bud.options) => {array}} basePlugins
 * @param {paths} paths
 * @param {options} options
 * @return {array}
 */
const basePlugins = (paths, options) => [
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
]

/**
 * Development plugins
 * @typedef {function (options: bud.options, features: bud.features) => {array}} devPlugins
 * @param {options} options
 * @param {features} features
 * @return {array}
 */
const devPlugins = (options, features) => [
  ...(features.hot ? [new HotModuleReplacementPlugin()] : []),
  ...(!options.inProduction ? [new NoEmitOnErrorsPlugin(), new WriteFilePlugin()] : []),
  ...(features.browserSync == true && features.debug == false ? [
    new BrowserSyncPlugin({
      host: options.browserSync.host,
      port: options.browserSync.port,
      proxy: options.browserSync.proxy,
    }),
  ] : []),
]

/**
 * Conditional plugins
 * @typedef {function (options: bud.options, features: bud.features) => {array}} conditionalPlugins
 * @param {options} options
 * @param {features} features
 * @return {array}
 */
const conditionalPlugins = (options, features) => [
  ...(options.auto ? [new ProvidePlugin(options.auto)] : []),
  ...(options.env ? [new DefinePlugin(options.env)] : []),
  ...(features.dependencyManifest ? [new DependencyExtractionPlugin(options.dependencyManifest)] : []),
  ...(options.copy.patterns.length > 0 ? [new CopyPlugin({patterns: options.copy.patterns})] : []),
  ...(options.splitting.disabled ? new LimitChunkCountPlugin({maxChunks: 1}) : []),
  ...(!options.splitting.disabled && options.splitting.maxChunks ? [
    new LimitChunkCountPlugin({maxChunks: options.splitting.maxChunks})
  ]: []),
]

/**
 * Webpack plugins.
 * @typedef {function (config: {options: bud.options, features: bud.features, paths: bud.paths}) => {object}} plugins
 * @param   {{options: bud.options, features: bud.features, paths: bud.paths}} config
 * @param   {options: bud.options} config.options
 * @param   {features: bud.features} config.features
 * @param   {paths: bud.paths} config.paths
 * @returns {object}
 */
const plugins = ({options, features, paths}) => ({
  plugins: [
    ...basePlugins(paths, options),
    ...devPlugins(options, eatures),
    ...conditionalPlugins(),
  ],
})

module.exports = plugins
