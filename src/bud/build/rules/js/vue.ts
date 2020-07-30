import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

const vue = (bud: Bud): any => ({
  bud,

  /**
   * Make vue rules
   */
  make: function () {
    this.pre()

    this.rule = {
      test: patterns.vue,
      exclude: patterns.vendor,
      use: [
        {
          loader: loaders.vue,
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
  },
})

export {vue}
