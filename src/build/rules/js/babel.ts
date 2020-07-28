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
      test: patterns.js,
      exclude: patterns.vendor,
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

    this.bud.state.options.target == 'node' && this.rule.use.push({
      loader: loaders.shebang,
    })

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
