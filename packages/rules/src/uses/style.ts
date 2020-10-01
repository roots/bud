import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'style-loader'

export const query: Bud.Use.Property = undefined

export const options: Bud.Use.Property = undefined

export const loader: Bud.Use.Factory = function (this: Bud) {
  return this.store['loaders'].get('style-loader')
}
