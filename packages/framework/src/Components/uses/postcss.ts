export const ident: Build.Use.Property = 'postcss-loader'

export const query: Build.Use.Property = undefined

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('postcss-loader')
}
