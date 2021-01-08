/* eslint-disable prettier/prettier */
import CompressionPlugin from 'compression-webpack-plugin'
import {Module, Framework} from '@roots/bud-typings'

export const when: Module.When = bud =>
  bud.store.enabled('features.gzip')

export const options: Module.Options<
  CompressionPlugin.Options<CompressionPlugin.ZlibOptions>
> = {
  algorithm: 'gzip',
  filename: '[name][ext].gz[query]',
  test: /\.js$|\.css$|\.html$/,
  compressionOptions: {
    level: 9,
  },
  threshold: 10240,
  minRatio: 0.8,
}

export const make: (
  options: Framework.Container<
    CompressionPlugin.Options<CompressionPlugin.ZlibOptions>
  >,
  bud: Framework,
) => CompressionPlugin = options =>
  new CompressionPlugin(options.all())
