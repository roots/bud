import {patterns} from './util/patterns'
import {useFile} from './use/useFile'

const image: ImageRulesFactory = (bud): imageLoaderInterface => ({
  bud,

  make: function () {
    this.options = {
      test: this.bud.hooks.filter('loaders_image_test', patterns.image),
      use: [
        this.bud.hooks.filter('loaders_image_use', {
          ...useFile('webpack.rules.font', bud),
        }),
      ],
    }

    return this.bud.hooks.filter('loaders_image_final', this.options)
  },
})

export type imageLoaderOptions = {
  test: RegExp
  use: [
    {
      loader: any | string
      options: any
    },
  ]
}

export type imageLoaderInterface = {
  bud: any
  make: () => any
}

export type ImageRulesFactory = (bud: any) => imageLoaderInterface

export {image}
