import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-typings'

const css = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.css', {
    test: bud.hooks.filter(
      'webpack.module.rules.css.test',
      bud.patterns.get('css'),
    ),

    use: bud.hooks.filter('webpack.module.rules.css.use', [
      bud.inProduction
        ? bud.uses.get('miniCss')(bud)
        : bud.loaders.get('style'),
      bud.uses.get('css')(bud),
      bud.uses.get('resolveUrl')(bud),
      bud.uses.get('postCss')(bud),
    ]),
  })

export {css}
