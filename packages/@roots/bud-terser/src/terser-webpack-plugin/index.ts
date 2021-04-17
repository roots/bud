import {Terser, Module} from '@roots/bud-framework'
import TerserPlugin from 'terser-webpack-plugin'

export const name = 'terser-webpack-plugin'

export const options: Module.Options<Terser.Options> = app => ({
  parallel: true,
  extractComments: false,
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
})

export const make: Module.Make<TerserPlugin, Terser.Options> = (
  options: Terser.Options,
) => new TerserPlugin(options.all())

export const when: Module.When = ({store, isProduction}) =>
  store.get('options.minify') && isProduction
