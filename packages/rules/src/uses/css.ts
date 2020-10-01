import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'css-loader'

export const options: Bud.Use.Property = {
  importLoaders: 1,
}

export const loader: Bud.Use.Property = function () {
  return this.store['loaders'].get('css-loader')
}

export const query: Bud.Use.Property = undefined
