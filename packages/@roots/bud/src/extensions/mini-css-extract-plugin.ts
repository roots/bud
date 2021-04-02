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
export const options: Options = ({
  store,
  subscribe,
}: Framework) => ({
  filename: `css/${
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.css')
      : store.get('options.fileFormat').concat('.css')
  }`,

  chunkFilename: `css/${
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.[id].css')
      : store.get('options.fileFormat').concat('.[id].css')
  }`,
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
