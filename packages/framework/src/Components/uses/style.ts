export const ident: Build.Use.Property = 'style-loader'

export const query: Build.Use.Property = undefined

export const options: Build.Use.Property = undefined

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('style-loader')
}
