import {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const name: Module['name'] = 'mini-css-extract-plugin'

export const make: Module['make'] = (options: Options) =>
  new MiniCssExtractPlugin(options.all())

export const options: Options = ({subscribe}) => ({
  filename: subscribe(
    'extension/mini-css-extract-plugin/options/filename',
    name,
  ),
  chunkFilename: subscribe(
    'extension/mini-css-extract-plugin/options/chunkFilename',
    name,
  ),
})

export const when: Module.When = app => app.isProduction

export const publish: Module['publish'] = ({
  store,
}: Framework) => ({
  ['extension/mini-css-extract-plugin/options/filename']: () =>
    store.get('options.hash')
      ? store.get('options.hashFormat').concat('.css')
      : store.get('options.fileFormat').concat('.css'),
  ['extension/mini-css-extract-plugin/options/chunkFilename']: () =>
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.[id].css')
      : store.get('options.fileFormat').concat('.[id].css'),
})

declare type Options = Module.Options<MiniCssExtractPlugin.PluginOptions>
