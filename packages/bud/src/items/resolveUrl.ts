import type Framework from '@roots/bud-typings'

export const ident: Framework.Item.Contract['ident'] =
  'resolve-url'

export const loader: Framework.Item.Contract['loader'] =
  'resolve-url-loader'

export const options: Framework.Item.Contract['options'] = {
  root: '',
  sourceMap: true,
}
