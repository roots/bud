import type {BudInterface} from '../'
import type {RuleSetRule} from 'webpack'

const font = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.font', {
    test: bud.hooks.filter(
      'bud.module.rules.font.test',
      bud.patterns.get('font'),
    ),

    use: bud.hooks.filter('bud.module.rules.font.use', [
      bud.loaders.get('file'),
    ]),
  })

export {font as default}
