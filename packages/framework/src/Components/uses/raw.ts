export const ident: Build.Use.Property = 'raw-loader'

export const query: Build.Use.Property = undefined

export const options: Build.Use.Property = undefined

export const loader: Build.Use.Property = function () {
  return this.components['loaders'].get('raw-loader')
}
