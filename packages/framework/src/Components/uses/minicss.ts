export const ident: Build.Use.Property = 'minicss'

export const options: Build.Use.Property = undefined

export const loader: Build.Use.Factory = function () {
  return this.components['loaders'].get('minicss-loader')
}
