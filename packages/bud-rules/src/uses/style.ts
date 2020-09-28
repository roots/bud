import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'style-loader'

export const query: Bud.Use.Property = undefined

export const options: Bud.Use.Property = undefined

export const loader: Bud.Use.Property = require.resolve(
  'style-loader',
)
