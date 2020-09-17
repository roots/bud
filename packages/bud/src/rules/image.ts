import type {BudInterface} from '../'
import type {RuleSetRule} from 'webpack'

const image = (bud: BudInterface): RuleSetRule =>
  bud.hooks.filter('webpack.module.rules.image', {
    test: bud.hooks.filter(
      'webpack.module.rules.image.test',
      bud.patterns.get('image'),
    ),

    use: bud.hooks.filter('webpack.module.rules.image.use', [
      bud.loaders.get('file'),
    ]),
  })

export {image as default}
