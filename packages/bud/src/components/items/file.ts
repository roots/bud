import type {Item} from '@roots/bud-typings'

export const ident: Item.Module.Ident = 'file'

export const loader: Item.Module.Loader = 'file-loader'

export const options: Item.Module.Options = {
  name: '[path][name].[ext]',
}

export const query: Item.Module.Query = undefined
