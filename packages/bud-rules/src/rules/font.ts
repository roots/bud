import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('font')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return this.bud.loaders.get('file').webpack
}
