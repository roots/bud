import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

const typescript: Function = (bud: Bud): any => ({
  bud,

  rule: {
    test: patterns.ts,
    exclude: patterns.vendor,
    use: [
      {
        loader: bud.loaders.ts,
        options: {
          configFile: bud.configs.get('typescript'),
        },
      },
    ],
  },

  make: function () {
    this.bud.hooks.call('webpack.rules.babel.post')

    this.rule = this.bud.hooks.filter('webpack.rules.typescript', this.rule)

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.test,
      },
      `webpack.rules.typescript.test`,
    )

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.exclude,
      },
      `webpack.rules.typescript.exclude`,
    )

    this.bud.logger.info(
      {
        name: 'webpack.rules',
        value: this.rule.use.map(item => item.loader),
      },
      `webpack.rules.typescript.use`,
    )

    this.bud.hooks.call('webpack.rules.babel.post')

    return this.rule
  },
})

export {typescript}
