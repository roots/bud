import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('svg')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return [this.store['uses'].get('svg-loader').make()]
}
