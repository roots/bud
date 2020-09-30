import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.store['pattterns'].get('typescript')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.store['pattterns'].get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.store['loaders'].get('typescript')
}
