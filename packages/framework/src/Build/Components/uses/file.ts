import Bud from '../../../Bud'

export const ident: Bud.Build.Use.Property = 'file-loader'

export const loader: Bud.Build.Use.Factory = function () {
  return this.components['loaders'].get('file-loader')
}

export const options: Bud.Build.Use.Property = {
  name: '[path][name].[ext]',
}

export const query: Bud.Build.Use.Property = undefined
