import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

import compiler from 'vue-template-compiler'

const vue = (bud: Bud): any => ({
  bud,

  make: function () {
    this.pre()

    this.rule = {
      test: patterns.vue,
      exclude: patterns.vendor,
      use: [
        {
          loader: bud.loaders.vue,
          options: {
            compiler,
            productionMode: this.bud.inProduction,
            cacheDirectory: this.bud.dist('cache/vue'),
            optimizeSSR: false,
            ...this.bud.options.get('vue'),
          },
        },
      ],
    }

    this.post()

    return this.rule
  },

  /**
   * Hook: pre_vue
   */
  pre: function () {
    this.bud.hooks.call('pre_vue', this)
  },

  /**
   * Hook: post_vue
   */
  post: function () {
    this.bud.hooks.call('post_vue', this.rule)
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.test.toString()},
      `vue test`,
    )
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.exclude.toString()},
      `vue exclude`,
    )
    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.use.map(item => item.loader),
      },
      `vue use`,
    )
  },
})

export {vue}
