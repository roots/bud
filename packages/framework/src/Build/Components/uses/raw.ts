import Bud from '../../../Bud'

export const ident: Bud.Build.Use.Property = 'raw-loader'

export const query: Bud.Build.Use.Property = undefined

export const options: Bud.Build.Use.Property = undefined

export const loader: Bud.Build.Use.Property = function () {
  return this.components['loaders'].get('raw-loader')
}
