import type {Bud} from '@roots/bud'

export const wordPressExternals: Bud.WordPressExternals.Configure = function wordpressExternals(
  options,
) {
  this.extensions.merge(
    '@roots/bud-wordpress-externals.options',
    options,
  )

  return this
}
