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
          loader: bud.loaders.get('babel'),
          options: {
            ...this.bud.options.get('babel'),
            cacheDirectory: true,
            cacheCompression: this.bud.inProduction,
          },
        },
      ],
    }

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
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.test.toString()},
      `babel test`,
    )
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.exclude.toString()},
      `babel exclude`,
    )
    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.use.map(item => item.loader),
      },
      `babel use`,
    )
  },
})

export {babel}
