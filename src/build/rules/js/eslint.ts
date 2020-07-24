import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'

/**
 * Eslint
 * @type {function} eslint
 */
const eslint = bud => ({
  bud,
  enabled: bud.state.configs.eslint,
  enforce: 'pre',
  test: patterns.js,
  include: bud.state.paths.src,
  exclude: patterns.vendor,
  loader: loaders.eslint,
  options: {
    configFile: bud.state.configs.eslint,
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
    this.bud.hooks.call('pre_eslint', this)
  },

  /**
   * Hook: post_eslint
   */
  post: function () {
    this.bud.hooks.call('post_eslint', this.output)
  },
})

export {eslint}
