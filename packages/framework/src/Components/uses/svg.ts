import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Build.Use.Property = 'svg'

export const query: Build.Use.Property = undefined

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('resolve-url-loader')
}

export const options: Build.Use.Property = {
  generator: content => svgToMiniDataUri(content.toString()),
}
