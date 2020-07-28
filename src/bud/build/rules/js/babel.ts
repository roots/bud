import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
const babel = (bud: Bud): any => ({
  bud,

  rule: {},

  /**
   * Make babel rules
   */
  make: function () {
    this.pre()

    this.rule = {
      include: /\.jsx?|\.tsx?/,
      use: [
        {
          loader: loaders.babel,
          options: {
            ...this.bud.state.options.babel,
            cacheDirectory: true,
            cacheCompression: this.bud.inProduction,
          },
        },
      ],
    }

    this.rule.test = /\.(js|jsx)$/

    this.post()

    return this.rule
  },

  /**
   * Hook: pre_babel
   */
  pre: function () {
    this.bud.hooks.call('pre_babel', this)
  },

  /**
   * Hook: post_babel
   */
  post: function () {
    this.bud.hooks.call('post_babel', this.rule)
  },
})

export {babel}
