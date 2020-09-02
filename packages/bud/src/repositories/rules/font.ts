import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-typings'

const font = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.font', {
    test: bud.hooks.filter(
      'bud.module.rules.font.test',
      bud.patterns.get('font'),
    ),

    use: bud.hooks.filter('bud.module.rules.font.use', [
      bud.uses.get('file')(bud),
    ]),
  })

export {font}
