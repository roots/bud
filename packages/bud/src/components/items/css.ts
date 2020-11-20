import type Framework from '@roots/bud-typings'

export const ident: Framework.Item.Contract['ident'] = 'css'
export const loader: Framework.Item.Contract['loader'] =
  'css-loader'
export const options: Framework.Item.Contract['options'] = {
  importLoaders: 2,
}
