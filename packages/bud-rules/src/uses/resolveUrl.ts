import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'file'

export const loader: Bud.Use.Factory = function () {
  return this.bud.loaders.get('resolve-url-loader')
}

export const options: Bud.Use.Property = {
  root: '',
  sourceMap: true,
}

export const query: Bud.Use.Property = undefined
