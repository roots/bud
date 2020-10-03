import Use from '../Use'

export const ident: Use.Property = 'postcss-loader'

export const query: Use.Property = undefined

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('postcss-loader')
}
