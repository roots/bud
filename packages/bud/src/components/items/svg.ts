import type Framework from '@roots/bud-typings'
import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Framework.Item.Contract['ident'] = 'svg'

export const loader: Framework.Item.Contract['loader'] =
  'resolve-url-loader'

export const options: Framework.Item.Contract['options'] = {
  generator: (content: unknown) =>
    svgToMiniDataUri(content.toString()),
}
