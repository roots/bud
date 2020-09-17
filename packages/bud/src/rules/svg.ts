import type {BudInterface} from '../'
import type {RuleSetRule} from 'webpack'

const svg = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.svg', {
    test: bud.hooks.filter(
      'webpack.module.rules.svg.test',
      bud.patterns.get('svg'),
    ),

    use: bud.hooks.filter('webpack.module.rules.svg.use', [
      bud.loaders.get('svg'),
    ]),
  })

export {svg as default}
