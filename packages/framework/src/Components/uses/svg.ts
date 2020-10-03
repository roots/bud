import Use from '../Use'
import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Use.Property = 'svg'

export const query: Use.Property = undefined

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('resolve-url-loader')
}

export const options: Use.Property = {
  generator: content => svgToMiniDataUri(content.toString()),
}
