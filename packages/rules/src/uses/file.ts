import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'file-loader'

export const loader: Bud.Use.Factory = function () {
  return this.store['loaders'].get('file-loader')
}

export const options: Bud.Use.Property = {
  name: '[path][name].[ext]',
}

export const query: Bud.Use.Property = undefined
