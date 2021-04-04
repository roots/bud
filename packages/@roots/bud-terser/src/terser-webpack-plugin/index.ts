import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import TerserPlugin from 'terser-webpack-plugin'

export const name = 'terser-webpack-plugin'

export const options: Framework.Terser.Options = app => ({
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

export const make: Module.Make<
  TerserPlugin,
  Framework.Terser.Options
> = (options: Framework.Terser.Options) =>
  new TerserPlugin(options.all())

export const when: Module.When = ({store, isProduction}) =>
  store.get('options.minify') && isProduction
