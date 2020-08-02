import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

const image: ImageRulesFactory = (bud): imageLoaderInterface => ({
  bud,

  make: function () {
    this.options = {
      test: this.bud.hooks.filter('loaders_image_test', patterns.image),
      use: this.bud.hooks.filter('loaders_image_use', [
        {
          loader: loaders.file,
          options: {
            name: '[path][name].[ext]',
          },
        },
      ]),
    }

    return this.bud.hooks.filter('loaders_image_final', this.options)
  },
})

export type imageLoaderOptions = {
  test: RegExp
  use: [
    {
      loader: object | string
      options: object
    },
  ]
}

export type imageLoaderInterface = {
  bud: object
  make: () => object
}

export type ImageRulesFactory = (bud: object) => imageLoaderInterface

export {image}
