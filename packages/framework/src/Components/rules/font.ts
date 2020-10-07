/**
 * Font test
 */
export const test: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('font')
}

/**
 * Font: Loaders
 */
export const use: Build.Rule.Factory<Build.Rule.Loader> = function () {
  return [this.components['uses'].get('file-loader').make()]
}
