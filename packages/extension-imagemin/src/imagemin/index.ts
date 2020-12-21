import Plugin from 'image-minimizer-webpack-plugin'
import type {Imagemin} from './typings'

export const make: Imagemin.Make = options =>
  new Plugin(options.all())

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
