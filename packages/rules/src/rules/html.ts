import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('html')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.loaders.get('raw').webpack
}
