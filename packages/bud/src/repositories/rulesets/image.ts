import type {Bud} from '../types'
import {uses} from './uses'
import {WebpackRule} from '@roots/bud-typings'

const image = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.image', {
    test: bud.hooks.filter(
      'webpack.module.rules.image.test',
      bud.patterns.get('image'),
    ),
    use: bud.hooks.filter('webpack.module.rules.image.use', [uses.file(bud)]),
  })

export {image}
