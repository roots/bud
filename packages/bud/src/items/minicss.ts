import type Framework from '@roots/bud-typings'

export const ident: Ident = 'mini-css'
export const loader: Loader = 'mini-css-loader'

declare type Loader = Framework.Item.Contract['loader']
declare type Ident = Framework.Item.Contract['ident']
