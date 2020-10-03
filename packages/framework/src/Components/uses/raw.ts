import Use from '../Use'

export const ident: Use.Property = 'raw-loader'

export const query: Use.Property = undefined

export const options: Use.Property = undefined

export const loader: Use.Property = function () {
  return this.store['loaders'].get('raw-loader')
}
