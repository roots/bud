import type {Bud} from '../types'
import type {WebpackRule} from '@roots/bud-typings'

const svg = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.svg', {
    test: bud.hooks.filter('webpack.module.rules.svg.test', bud.patterns.get('svg')),
    use: bud.hooks.filter('webpack.module.rules.svg.use', [
      bud.loaders.get('svgr'),
      bud.loaders.get('url'),
    ]),
  })

export {svg}
