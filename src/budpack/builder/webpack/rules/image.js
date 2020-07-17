import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

/**
 * Image module rules
 *
 * @typedef {function} image
 * @return {object}
 */
const image = builder => ({
  builder,
  output: {},

  test: patterns.image,
  use: [
    {
      loader: loaders.file,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],

  /**
   * Make image rules
   */
  make: function () {
    this.pre()

    this.output = {
      test: this.test,
      use: this.use,
    }

    this.post()

    return this.output
  },

  /**
   * Hook: pre_image
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_image', this)
  },

  /**
   * Hook: post_image
   */
  post: function () {
    this.builder.bud.hooks.call('post_image', this.output)
  },
})

export {image}
