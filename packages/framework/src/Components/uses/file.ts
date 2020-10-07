export const ident: Build.Use.Property = 'file-loader'

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('file-loader')
}

export const options: Build.Use.Property = {
  name: '[path][name].[ext]',
}

export const query: Build.Use.Property = undefined
