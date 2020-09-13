import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-types'

const svg = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.svg', {
    test: bud.hooks.filter(
      'webpack.module.rules.svg.test',
      bud.patterns.get('svg'),
    ),

    use: bud.hooks.filter('webpack.module.rules.svg.use', [
      bud.loaders.get('svg'),
    ]),
  })

export {svg}
