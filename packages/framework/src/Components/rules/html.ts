export const test: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('html')
}

export const use: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.components['uses'].get('raw-loader').make()
}
