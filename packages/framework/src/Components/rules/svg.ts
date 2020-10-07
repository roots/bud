export const test: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('svg')
}

export const use: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return [this.components['uses'].get('svg-loader').make()]
}
