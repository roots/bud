import {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/** Namespace helper */
const ns = (str: string) => `${name}/${str}`

/** Name */
export const name: Module['name'] = 'mini-css-extract-plugin'

/** Make plugin */
export const make: Module['make'] = (options: Options) =>
  new MiniCssExtractPlugin(options.all())

/** Plugin options */
export const options: Options = ({subscribe}) => ({
  filename: subscribe(ns('filename'), name),
  chunkFilename: subscribe(ns('chunkFilename'), name),
})

/** When */
export const when: Module.When = app => app.isProduction

/** Filters */
export const topics: Module['topics'] = () => [
  ns('filename'),
  ns('chunkFilename'),
]

/** Filter values */
export const publish: Module['publish'] = ({
  store,
}: Framework) => ({
  [ns('filename')]: () =>
    store.get('options.hash')
      ? store.get('options.hashFormat').concat('.css')
      : store.get('options.fileFormat').concat('.css'),
  [ns('chunkFilename')]: () =>
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.[id].css')
      : store.get('options.fileFormat').concat('.[id].css'),
})

declare type Options = Module.Options<MiniCssExtractPlugin.PluginOptions>
