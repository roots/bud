export const ident: Build.Use.Property = 'css-loader'

export const options: Build.Use.Property = {
  importLoaders: 1,
}

export const query: Build.Use.Property = undefined

export const loader: Build.Use.Property = function () {
  return this.components['loaders'].get('css-loader')
}
