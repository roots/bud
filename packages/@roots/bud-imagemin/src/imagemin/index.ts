import {Imagemin, Framework} from '@roots/bud-framework'
import Plugin from 'image-minimizer-webpack-plugin'

/**
 * Plugin name
 */
export const name: Framework.Module['name'] =
  'image-minimizer-webpack-plugin'

/**
 * Plugin options
 */
export const options: () => Imagemin.Options = () => ({
  minimizerOptions: {
    plugins: [
      ['gifsicle', {interlaced: true}],
      ['jpegtran', {progressive: true}],
      ['optipng', {optimizationLevel: 7}],
      ['svgo', {plugins: [{removeViewBox: false}]}],
    ],
  },
})

/**
 * Plugin
 */
export const make: Framework.Module.Make<
  Plugin,
  Imagemin.Options
> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
export const when: Framework.Module.When = ({isDevelopment}) =>
  isDevelopment
