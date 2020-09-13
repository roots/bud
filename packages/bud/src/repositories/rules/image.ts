import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-types'

const image = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.image', {
    test: bud.hooks.filter(
      'webpack.module.rules.image.test',
      bud.patterns.get('image'),
    ),

    use: bud.hooks.filter('webpack.module.rules.image.use', [
      bud.loaders.get('file'),
    ]),
  })

export {image}
