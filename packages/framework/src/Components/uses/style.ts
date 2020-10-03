import Use from '../Use'

export const ident: Use.Property = 'style-loader'

export const query: Use.Property = undefined

export const options: Use.Property = undefined

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('style-loader')
}
