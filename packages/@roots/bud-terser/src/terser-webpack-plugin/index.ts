import {Bud} from '@roots/bud'
import TerserPlugin from 'terser-webpack-plugin'

export const options: Bud.Terser.Options = app => ({
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
  extractComments: false,
  parallel: true,
})

export const make: Bud.Module.Make<
  TerserPlugin,
  Bud.Terser.Options
> = (options: Bud.Terser.Options) =>
  new TerserPlugin(options.all())

export const when: Bud.Module.When = ({options}) =>
  options.enabled('minify') && options.is('mode', 'production')
