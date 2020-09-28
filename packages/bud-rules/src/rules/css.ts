import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('css')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.bud.patterns.get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return [
    this.bud.mode.is('production')
      ? this.bud.loaders.get('minicss').webpack
      : this.bud.loaders.get('style').webpack,
    this.bud.loaders.get('css').webpack,
    this.bud.loaders.get('resolveUrl').webpack,
    this.bud.loaders.get('postcss').webpack,
  ]
}
