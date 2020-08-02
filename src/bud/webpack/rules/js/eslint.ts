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
            configFile: this.bud.configs.get('eslint'),
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
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.test.toString()}, `eslint test`
    )
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.exclude.toString()}, `eslint exclude`
    )
    this.bud.logger.info(
      {name: 'webpack.rules', value: this.rule.use.map(item => item.loader)}, `eslint use`
    )
  },
})

export {eslint}
