import Plugin from 'image-minimizer-webpack-plugin'
import type {Imagemin} from '../types'
import type {Module} from '@roots/bud-typings'

/**
 * Plugin name
 */
export const name = 'image-minimizer-webpack-plugin'

/**
 * Plugin options
 */
export const options: Imagemin.Options = {
  minimizerOptions: {
    plugins: [
      ['gifsicle', {interlaced: true}],
      ['jpegtran', {progressive: true}],
      ['optipng', {optimizationLevel: 7}],
      [
        'svgo',
        {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
      ],
    ],
  },
}

/**
 * Plugin
 */
export const make: Module.Make<
  Plugin,
  Imagemin.Options
> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
export const when: Module.When = ({options}) =>
  options.is('mode', 'development')
