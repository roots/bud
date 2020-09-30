import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'css'
export const options: Bud.Use.Property = {
  importLoaders: 1,
}
export const loader: Bud.Use.Property = require.resolve(
  'css-loader',
)
export const query: Bud.Use.Property = undefined
