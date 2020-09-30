import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['pattterns'].get('js')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['pattterns'].get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return this.store['loaders'].get('babel').make()
}
