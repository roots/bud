import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('image')
}

export const use: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.loaders.get('file').webpack
}
