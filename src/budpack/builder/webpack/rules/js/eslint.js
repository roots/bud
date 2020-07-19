import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'

/**
 * Eslint
 * @type {function} eslint
 */
const eslint = builder => ({
  builder,
  enabled: builder.bud.configs.eslint,
  enforce: 'pre',
  test: patterns.js,
  include: builder.bud.paths.src,
  exclude: patterns.vendor,
  loader: loaders.eslint,
  options: {
    configFile: builder.bud.configs.eslint,
    formatter: 'codeframe',
    failOnError: true,
  },
  output: {},

  /**
   * Make: eslint rules
   * @property {function} make
   */
  make: function () {
    this.pre()

    this.output = this.enabled
      ? {
          enforce: this.enforce,
          test: this.test,
          include: this.include,
          exclude: this.exclude,
          loader: this.loader,
          options: this.options,
        }
      : {}

    this.post()

    return this.output
  },

  /**
   * Hook: pre_eslint
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_eslint', this)
  },

  /**
   * Hook: post_eslint
   */
  post: function () {
    this.builder.bud.hooks.call('post_eslint', this.output)
  },
})

export {eslint}
