import Bud from '../../../Bud'

import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Bud.Build.Use.Property = 'svg'

export const query: Bud.Build.Use.Property = undefined

export const loader: Bud.Build.Use.Factory = function () {
  return this.components['loaders'].get('resolve-url-loader')
}

export const options: Bud.Build.Use.Property = {
  generator: content => svgToMiniDataUri(content.toString()),
}
