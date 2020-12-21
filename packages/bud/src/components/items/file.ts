import type {Item} from '@roots/bud-typings'

export const ident: Item['ident'] = 'file'

export const loader: Item['loader'] = 'file-loader'

export const options: Item['options'] = {
  name: '[path][name].[ext]',
}

export const query: Item['query'] = undefined
