import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('js')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return [this.store['uses'].get('babel-loader').make()]
}
