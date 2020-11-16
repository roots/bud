import type {Item} from '@roots/bud-typings'

export const ident: Item.Contract['ident'] = 'resolve-url'

export const loader: Item.Contract['loader'] =
  'resolve-url-loader'

export const options: Item.Contract['options'] = {
  root: '',
  sourceMap: true,
}
