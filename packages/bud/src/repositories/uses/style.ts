import {Bud, RuleSetLoader} from '@roots/bud-typings'

const style = (bud: Bud): RuleSetLoader =>
  bud.hooks.filter('webpack.module.style', {
    loader: bud.hooks.filter(
      'webpack.module.style.loader',
      bud.loaders.get('style'),
    ),
  })

export {style as default}
