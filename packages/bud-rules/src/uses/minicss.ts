import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'minicss'
export const query: Bud.Use.Property = undefined
export const options: Bud.Use.Property = undefined
export const loader: Bud.Use.Factory = function () {
  return this.bud.loaders.get('mini-css')
}
