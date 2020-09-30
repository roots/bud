import Bud from '@roots/bud-types'
import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Bud.Use.Property = 'svg'

export const query: Bud.Use.Property = undefined

export const loader: Bud.Use.Factory = function (this: Bud) {
  return this.store['loaders'].get('url-loader')
}

export const options: Bud.Use.Property = {
  generator: content => svgToMiniDataUri(content.toString()),
}
