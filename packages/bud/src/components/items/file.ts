import type Framework from '@roots/bud-typings'

export const ident: Framework.Item.Contract['ident'] = 'file'

export const loader: Framework.Item.Contract['loader'] =
  'file-loader'

export const options: Framework.Item.Contract['options'] = {
  name: '[path][name].[ext]',
}

export const query: Framework.Item.Contract['query'] = undefined
