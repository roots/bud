import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Framework.Item['ident'] = 'svg'
export const loader: Framework.Item['loader'] =
  'resolve-url-loader'
export const options: Framework.Item['options'] = {
  generator: (content: unknown) =>
    svgToMiniDataUri(content.toString()),
}
