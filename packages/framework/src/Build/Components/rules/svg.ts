import Bud from '../../../Bud'

export const test: Bud.Build.Rule.Factory<Bud.Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('svg')
}

export const use: Bud.Build.Rule.Factory<Bud.Build.Rule.Conditional> = function () {
  return [this.components['uses'].get('svg-loader').make()]
}
