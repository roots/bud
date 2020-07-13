import DependencyExtractionPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import {
  DefinePlugin,
  LimitChunkCountPlugin,
  ProvidePlugin,
} from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'

/**
 * Conditional plugins
 *
 * @typedef {function (options: bud.options, features: bud.features) => {array}} conditionalPlugins
 * @param {options} options
 * @param {features} features
 * @return {array}
 */
const conditionalPlugins = (options, features) => [
  ...(options.auto
    ? [new ProvidePlugin(options.auto)]
    : []),
  ...(options.env ? [new DefinePlugin(options.env)] : []),
  ...(features.dependencyManifest
    ? [
        new DependencyExtractionPlugin(
          options.dependencyManifest,
        ),
      ]
    : []),
  ...(options.copy.patterns.length > 0
    ? [new CopyPlugin({patterns: options.copy.patterns})]
    : []),
  ...(options.splitting.disabled
    ? new LimitChunkCountPlugin({maxChunks: 1})
    : []),
  ...(!options.splitting.disabled &&
  options.splitting.maxChunks
    ? [
        new LimitChunkCountPlugin({
          maxChunks: options.splitting.maxChunks,
        }),
      ]
    : []),
]

export {conditionalPlugins}
