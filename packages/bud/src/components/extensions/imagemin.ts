import Plugin from 'image-minimizer-webpack-plugin'
import ImageMin from 'imagemin'
import type {Bud, Extension} from '@roots/bud-typings'

export const api: Extension.Api = () => ({
  imagemin: function (
    this: Bud.Bud,
    plugins?: ImageMin.Options['plugins'],
  ): Bud.Bud {
    this.features.enable('minify')

    plugins &&
      this.extensions
        .get('image-minimizer-webpack-plugin')
        .set('minimizerOptions.plugins', plugins)

    return this
  },
})

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

export const make: Extension.Make<Plugin, Options> = opt =>
  new Plugin(opt.getStore())

export const when: Extension.When = ({features}) =>
  features.enabled('minify')

export type Options = {
  minimizerOptions: {
    plugins: Array<[string, {[key: string]: any}]>
  }
}
