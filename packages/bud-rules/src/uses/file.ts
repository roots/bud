import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'file'

export const loader: Bud.Use.Factory = function () {
  return require.resolve('file-loader')
}

export const options: Bud.Use.Property = {
  name: '[path][name].[ext]',
}

export const query: Bud.Use.Property = undefined
