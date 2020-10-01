import * as Bud from '@roots/bud-types'

/**
 * Font: Test
 */
export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('font')
}

/**
 * Font: Loaders
 */
export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return [this.store['uses'].get('file-loader').make()]
}
