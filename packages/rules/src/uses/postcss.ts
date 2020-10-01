import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'postcss-loader'

export const query: Bud.Use.Property = undefined

export const loader: Bud.Use.Factory = function () {
  return this.store['loaders'].get('postcss-loader')
}
