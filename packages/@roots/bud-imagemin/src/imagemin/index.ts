import type {Bud} from '@roots/bud'
import Plugin from 'image-minimizer-webpack-plugin'

/**
 * Plugin name
 */
export const name = 'image-minimizer-webpack-plugin'

/**
 * Plugin options
 */
export const options: Bud.Imagemin.Options = {
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
export const make: Bud.Module.Make<
  Plugin,
  Bud.Imagemin.Options
> = options => new Plugin(options.all())

/**
 * Usage conditions
 */
export const when: Bud.Module.When = ({options}) =>
  options.is('mode', 'development')
