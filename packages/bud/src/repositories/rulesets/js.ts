import type {Bud} from '../types'
import type {WebpackRule} from '@roots/bud-typings'

const js = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.js', {
    test: bud.hooks.filter(
      'webpack.module.rules.js.test',
      bud.patterns.get('js'),
    ),
    exclude: bud.hooks.filter(
      'webpack.module.rules.js.exclude',
      bud.patterns.get('vendor'),
    ),
    use: bud.hooks.filter('webpack.module.rules.js.use', [
      bud.uses.get('babel')(bud),
    ]),
  })

export {js}
