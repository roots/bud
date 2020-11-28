import Plugin from 'image-minimizer-webpack-plugin'
import {Make, Options, When} from './typings'

export * as api from './api'

export const make: Make = opt => new Plugin(opt.getStore())

export const when: When = ({features}) =>
  features.enabled('imagemin')

export const options: Options = {
  minimizerOptions: {
    plugins: [
      ['gifsicle', {interlaced: true}],
      ['jpegtran', {progressive: true}],
      ['optipng', {optimizationLevel: 5}],
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
