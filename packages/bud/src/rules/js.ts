import type {BudInterface} from '../'
import type {RuleSetRule} from 'webpack'

const js = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.js', {
    test: bud.hooks.filter(
      'webpack.module.rules.js.test',
      bud.patterns.get('js'),
    ),

    exclude: bud.hooks.filter(
      'webpack.module.rules.js.exclude',
      bud.patterns.get('modules'),
    ),

    use: bud.hooks.filter('webpack.module.rules.js.use', [
      bud.loaders.get('babel'),
    ]),
  })

export = js
