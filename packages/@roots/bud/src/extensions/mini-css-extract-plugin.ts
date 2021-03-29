import {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

declare type Options = Module.Options<MiniCssExtractPlugin.PluginOptions>

/**
 * Plugin name
 */
export const name: Module['name'] = 'mini-css-extract-plugin'

/**
 * Options
 */
export const options: Options = ({subscribe}: Framework) => ({
  filename: subscribe(
    'extension/mini-css-extract-plugin/options/filename',
    name,
  ),

  chunkFilename: subscribe(
    'extension/mini-css-extract-plugin/options/chunkFilename',
    name,
  ),
})

/**
 * Published options
 */
export const publish: Module['publish'] = ({
  store,
}: Framework) => ({
  /**
   * Filename
   */
  'extension/mini-css-extract-plugin/options/filename': () =>
    store.get('options.hash')
      ? store.get('options.hashFormat').concat('.css')
      : store.get('options.fileFormat').concat('.css'),

  /**
   * Chunk filename
   */
  'extension/mini-css-extract-plugin/options/chunkFilename': () =>
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.[id].css')
      : store.get('options.fileFormat').concat('.[id].css'),
})

/**
 * Make
 */
export const make: Module['make'] = (options: Options) =>
  new MiniCssExtractPlugin(options.all())

/**
 * Load in production
 */
export const when: Module.When = ({isProduction}) => isProduction
