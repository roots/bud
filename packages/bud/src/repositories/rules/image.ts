import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-typings'

const image = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.image', {
    test: bud.hooks.filter(
      'webpack.module.rules.image.test',
      bud.patterns.get('image'),
    ),

    use: bud.hooks.filter('webpack.module.rules.image.use', [
      bud.uses.get('file')(bud),
    ]),
  })

export {image}
