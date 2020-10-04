import Bud from '../../../Bud'

export const test: Bud.Build.Rule.Factory<Bud.Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('js')
}

export const exclude: Bud.Build.Rule.Factory<Bud.Build.Rule.Conditional> = function () {
  return this.store['patterns'].get('modules')
}

export const use: Bud.Build.Rule.Factory<Bud.Build.Rule.Loader> = function () {
  return [this.components['uses'].get('babel-loader').make()]
}
