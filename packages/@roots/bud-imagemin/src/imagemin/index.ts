import {Module} from '@roots/bud-framework'
import Plugin from 'image-minimizer-webpack-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin/types'

/**
 * Plugin name
 */
export const name: Module['name'] =
  'image-minimizer-webpack-plugin'

/**
 * Plugin options
 */
export const options: Module['options'] &
  ImageMinimizerPlugin['options'] = () => ({
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
export const make: Module.Make<
  ImageMinimizerPlugin,
  ImageMinimizerPlugin['options']
> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
export const when: Module.When = ({isDevelopment}) =>
  isDevelopment
