export const ident: Build.Use.Property = 'file'

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('resolve-url-loader')
}

export const options: Build.Use.Property = {
  root: '',
  sourceMap: true,
}

export const query: Build.Use.Property = undefined
