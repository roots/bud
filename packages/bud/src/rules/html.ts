import type {BudInterface} from '..'
import type {RuleSetRule} from 'webpack'

const html = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.html', {
    test: bud.hooks.filter(
      'webpack.module.rules.html.test',
      bud.patterns.get('html'),
    ),
    use: bud.hooks.filter('webpack.module.rules.raw.use', [
      bud.loaders.get('raw'),
    ]),
  })

export {html as default}
