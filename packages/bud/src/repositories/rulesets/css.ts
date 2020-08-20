import type {Bud} from '../..'
import {uses} from './uses'
import type {WebpackRule} from '@roots/bud-typings'

const css = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.css', {
    test: bud.hooks.filter('webpack.module.rules.css.test', bud.patterns.get('css')),
    exclude: bud.hooks.filter(
      'webpack.module.rules.css.exclude',
      bud.patterns.get('vendor'),
    ),
    use: bud.hooks.filter('webpack.module.rules.css.use', [
      uses.miniCss(bud),
      uses.css(bud),
      uses.resolveUrl(bud),
      uses.postCss(bud),
    ]),
  })

export {css}
