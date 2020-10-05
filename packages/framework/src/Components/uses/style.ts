import Bud from '../../Bud'

export const ident: Bud.Build.Use.Property = 'style-loader'

export const query: Bud.Build.Use.Property = undefined

export const options: Bud.Build.Use.Property = undefined

export const loader: Bud.Build.Use.Factory = function () {
  return this.components['loaders'].get('style-loader')
}
