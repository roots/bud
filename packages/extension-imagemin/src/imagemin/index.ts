import Plugin from 'image-minimizer-webpack-plugin'
import type {Imagemin} from './typings'
import type {Module} from '@roots/bud-typings'

export const make: Module.Make<
  Imagemin.Plugin,
  Imagemin.Options
> = options => new Plugin(options.all()) as any

export const when: Imagemin.When = ({features}) =>
  features.enabled('imagemin')

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
