import type {Item} from '@roots/bud-typings'

export const ident: Item['ident'] = 'resolve-url'

export const loader: Item['loader'] = 'resolve-url-loader'

export const options: Item['options'] = {
  root: '',
  sourceMap: true,
}
