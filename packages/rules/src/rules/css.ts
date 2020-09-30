import Bud from '@roots/bud-types'

export const test: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('css')
}

export const exclude: Bud.Rule.Factory<Bud.Rule.Conditional> = function () {
  return this.store['patterns'].get('modules')
}

export const use: Bud.Rule.Factory<Bud.Rule.Loader> = function () {
  return [
    this.mode.is('production')
      ? this.store['loaders'].get('minicss').make()
      : this.store['loaders'].get('style').make(),
    this.store['loaders'].get('css').make(),
    this.store['loaders'].get('resolveUrl').make(),
    this.store['loaders'].get('postcss').make(),
  ]
}
