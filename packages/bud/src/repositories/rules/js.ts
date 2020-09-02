import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-typings'

const js = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.js', {
    test: bud.hooks.filter(
      'webpack.module.rules.js.test',
      bud.patterns.get('js'),
    ),

    exclude: bud.hooks.filter(
      'webpack.module.rules.js.exclude',
      bud.patterns.get('modules'),
    ),

    use: bud.hooks.filter('webpack.module.rules.js.use', {
      value: [bud.uses.get('babel')(bud)],
      bud,
    }).value,
  })

export {js}
