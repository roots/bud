export const test: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('js')
}

export const exclude: Build.Rule.Factory<Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('modules')
}

export const use: Build.Rule.Factory<Build.Rule.Loader> = function () {
  return [this.components['uses'].get('babel-loader').make()]
}
