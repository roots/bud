import Use from '../Use'

export const ident: Use.Property = 'minicss'

export const options: Use.Property = undefined

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('minicss-loader')
}
