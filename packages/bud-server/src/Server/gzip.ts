import CompressionPlugin from 'compression-webpack-plugin'
import {Module} from '@roots/bud-typings'

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

export const make: Module.Make<CompressionPlugin.ZlibOptions.Framework> = opt =>
  new CompressionPlugin(opt.all())

export declare type Options = CompressionPlugin.Options<CompressionPlugin.ZlibOptions>
