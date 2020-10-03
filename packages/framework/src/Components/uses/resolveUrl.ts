import Use from '../Use'

export const ident: Use.Property = 'file'

export const loader: Use.Factory = function () {
  return this.store['loaders'].get('resolve-url-loader')
}

export const options: Use.Property = {
  root: '',
  sourceMap: true,
}

export const query: Use.Property = undefined
