import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

type imageLoaderOptions = {
  test: RegExp
  use: [
    {
      loader: object
      options: object
    },
  ]
}

type imageLoaderInterface = {
  builder: object
  options: imageLoaderOptions
  make: () => object
  doHook: (name: string) => void
}

type ImageRulesFactory = (
  builder: object,
) => imageLoaderInterface

/**
 * Image module rules
 *
 * @type     {Function} image
 * @property {imageLoaderOptions} options
 * @return {object}
 */
const image: ImageRulesFactory = (
  builder,
): imageLoaderInterface => ({
  builder,

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
    this.builder.bud.hooks.call(
      `${name}_webpack_rules_image`,
      this.options,
      this.builder.bud,
    )
  },
})

export {image}
