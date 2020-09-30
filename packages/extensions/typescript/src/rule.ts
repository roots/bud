import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('typescript')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.loaders.get('typescript')
}
