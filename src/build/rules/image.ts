import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

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
  options: imageLoaderOptions
  make: () => object
  doHook: (name: string) => void
}

export type ImageRulesFactory = (
  bud: object,
) => imageLoaderInterface

/**
 * Image module rules
 *
 * @type     {Function} image
 * @property {imageLoaderOptions} options
 * @return {object}
 */
const image: ImageRulesFactory = (
  bud,
): imageLoaderInterface => ({
  bud,

  options: {
    test: patterns.image,
    use: [
      {
        loader: loaders.file,
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  make: function () {
    this.doHook('pre')
    this.doHook('post')

    return this.options
  },

  doHook: function (name: string): void {
    this.bud.hooks.call(
      `${name}_webpack_rules_image`,
      this.options,
      this.bud,
    )
  },
})

export {image}
