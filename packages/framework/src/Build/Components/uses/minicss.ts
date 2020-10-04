import Bud from '../../../Bud'

export const ident: Bud.Build.Use.Property = 'minicss'

export const options: Bud.Build.Use.Property = undefined

export const loader: Bud.Build.Use.Factory = function () {
  return this.components['loaders'].get('minicss-loader')
}
