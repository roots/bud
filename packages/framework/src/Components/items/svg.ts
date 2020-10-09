import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Build.Item['ident'] = 'svg'

export const query: Build.Item['query'] = undefined

export const loader: Build.Item['loader'] = loaders =>
  loaders.get('resolve-url-loader')

export const options: Build.Item['options'] = {
  generator: content => svgToMiniDataUri(content.toString()),
}
