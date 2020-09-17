import type {BudInterface} from '../'
import type {RuleSetRule} from 'webpack'

const css = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.css', {
    test: bud.hooks.filter(
      'webpack.module.rules.css.test',
      bud.patterns.get('css'),
    ),
    use: bud.hooks.filter('webpack.module.rules.css.use', [
      bud.mode.is('production')
        ? bud.loaders.get('minicss')
        : bud.loaders.get('style'),
      bud.loaders.get('css'),
      bud.loaders.get('resolveUrl'),
      bud.loaders.get('postcss'),
    ]),
  })

export {css as default}
