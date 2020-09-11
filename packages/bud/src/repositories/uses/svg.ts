import {Bud, RuleSetLoader} from '@roots/bud-types'
import svgToMiniDataUri from 'mini-svg-data-uri'

const svg = (bud: Bud): RuleSetLoader =>
  bud.hooks.filter('webpack.module.svg', {
    loader: bud.hooks.filter(
      'webpack.module.svg.loader',
      bud.loaders.get('url'),
    ),
    options: bud.hooks.filter('webpack.module.svg.options', {
      generator: content => svgToMiniDataUri(content.toString()),
    }),
  })

export {svg as default}
