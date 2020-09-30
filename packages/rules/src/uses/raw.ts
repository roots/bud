import Bud from '@roots/bud-types'

export const ident: Bud.Use.Property = 'raw'

export const query: Bud.Use.Property = undefined

export const options: Bud.Use.Property = undefined

export const loader: Bud.Use.Property = require.resolve(
  'raw-loader',
)
