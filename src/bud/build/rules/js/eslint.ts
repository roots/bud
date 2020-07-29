import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

const eslint: Function = (bud: Bud): any => ({
  bud,
  rule: {},

  make: function () {
    this.pre()

    this.rule = {
      enforce: 'pre',
      test: patterns.js,
      exclude: patterns.vendor,
      use: [
        {
          loader: loaders.eslint,
          options: {
            configFile: bud.configs.get('eslint'),
            formatter: 'codeframe',
            failOnError: true,
          },
        },
      ],
    }

    this.post()

    return this.rule
  },

  pre: function () {
    this.bud.hooks.call('pre_eslint', this)
  },

  post: function () {
    this.bud.hooks.call('post_eslint', this.rule)
  },
})

export {eslint}
