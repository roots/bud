import Bud from '../../../Bud'

export const ident: Bud.Build.Use.Property = 'file'

export const loader: Bud.Build.Use.Factory = function () {
  return this.components['loaders'].get('resolve-url-loader')
}

export const options: Bud.Build.Use.Property = {
  root: '',
  sourceMap: true,
}

export const query: Bud.Build.Use.Property = undefined
