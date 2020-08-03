import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

const babel = (bud: Bud): any => ({
  bud,

  rule: {
    test: patterns.js,
    exclude: patterns.vendor,
    use: [
      {
        loader: bud.loaders.get('babel'),
        options: {
          ...bud.options.get('babel'),
          cacheDirectory: true,
          cacheCompression: bud.inProduction,
        },
      },
    ],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.babel.pre')
    this.rule = this.bud.hooks.filter('webpack.rules.babel', this.rule)
    this.bud.hooks.call('webpack.rules.babel.post')

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.test,
      },
      `webpack.rules.babel.test`,
    )

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.exclude,
      },
      `webpack.rules.babel.exclude`,
    )

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.use.map(item => item.loader),
      },
      `webpack.rules.babel.use`,
    )

    return this.rule
  },
})

export {babel}
