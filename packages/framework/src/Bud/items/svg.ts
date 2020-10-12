import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Build.Item['ident'] = 'svg'

export const loader: Build.Item['loader'] = 'resolveUrl'

export const options: Build.Item['options'] = {
  generator: content => svgToMiniDataUri(content.toString()),
}
