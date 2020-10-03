import Rule from '../Rule'

/**
 * Font test
 */
export const test: Rule.Factory<Rule.Conditional> = function () {
  return this.store['patterns'].get('font')
}

/**
 * Font: Loaders
 */
export const use: Rule.Factory<Rule.Loader> = function () {
  return [this.store['uses'].get('file-loader').make()]
}
