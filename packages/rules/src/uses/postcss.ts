import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'postcss'

export const query: Bud.Use.Property = undefined

export const loader: Bud.Use.Factory = function (this: Bud) {
  return this.store['loaders'].get('postcss-loader')
}

export const options: Bud.Use.Factory = function (this: Bud) {
  return this.store['postcss'].repository
}
