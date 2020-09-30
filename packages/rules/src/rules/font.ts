import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('font')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return this.store['loaders'].get('file').make()
}
