import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['pattterns'].get('image')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['loaders'].get('file').make()
}
