import type Bud from '../../Bud'

/**
 * Font test
 */
export const test: Bud.Build.Rule.Factory<Bud.Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('font')
}

/**
 * Font: Loaders
 */
export const use: Bud.Build.Rule.Factory<Bud.Build.Rule.Loader> = function () {
  return [this.components['uses'].get('file-loader').make()]
}
