export const test: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('image')
}

export const use: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return [this.components['uses'].get('file-loader').make()]
}
