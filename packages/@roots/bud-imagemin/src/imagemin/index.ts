import type {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'
import Plugin from 'image-minimizer-webpack-plugin'

/**
 * Plugin name
 */
export const name: Module['name'] =
  'image-minimizer-webpack-plugin'

/**
 * Plugin options
 */
export const options: () => Framework.Imagemin.Options = () => ({
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
  Plugin,
  Framework.Imagemin.Options
> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
export const when: Module.When = ({isDevelopment}) =>
  isDevelopment
