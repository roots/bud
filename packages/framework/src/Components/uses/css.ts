import Use from '../Use'

export const ident: Use.Property = 'css-loader'

export const options: Use.Property = {
  importLoaders: 1,
}

export const loader: Use.Property = function () {
  return this.store['loaders'].get('css-loader')
}

export const query: Use.Property = undefined
