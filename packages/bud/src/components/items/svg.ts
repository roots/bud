import type {Item} from '@roots/bud-typings'
import svgToMiniDataUri from 'mini-svg-data-uri'

export const ident: Item['ident'] = 'svg'

export const loader: Item['loader'] = 'resolve-url-loader'

export const options: Item['options'] = {
  generator: (content: unknown) =>
    svgToMiniDataUri(content.toString()),
}
