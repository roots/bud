import {loaders} from '../util/loaders'

/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
const babel = builder => ({
  builder,
  output: {},
  enabled: builder.bud.features.babel,
  loader: loaders.babel,
  options: {
    ...builder.bud.options.babel,
    cacheDirectory: true,
    cacheCompression: builder.bud.inProduction,
  },

  /**
   * Make babel rules
   */
  make: function () {
    this.pre()

    this.output = this.enabled
      ? {
          loader: this.loader,
          options: this.options,
        }
      : {}

    this.post()

    return this.output
  },

  /**
   * Hook: pre_babel
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_babel', this)
  },

  /**
   * Hook: post_babel
   */
  post: function () {
    this.builder.bud.hooks.call('post_babel', this.output)
  },
})

export {babel}
