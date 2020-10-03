import Use from '../Use'

export const ident: Use.Property = 'file-loader'

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('file-loader')
}

export const options: Use.Property = {
  name: '[path][name].[ext]',
}

export const query: Use.Property = undefined
