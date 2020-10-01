import * as Bud from '@roots/bud-types'

/**
 * CSS: Test
 */
export const test: CSS.Patterns = function () {
  return this.store['patterns'].get('css')
}

/**
 * CSS: Exclude
 */
export const exclude: CSS.Exclude = function () {
  return this.store['patterns'].get('modules')
}

/**
 * CSS: Loaders
 * {@see Bud.Use}
 */
export const use: CSS.Loaders = function () {
  const use = (loader: string): Bud.Use.Product =>
    this.store['uses'].get(loader).make()

  return [
    this.mode.is('production')
      ? use('minicss-loader')
      : use('style-loader'),
    use('css-loader'),
    use('resolve-url-loader'),
    use('postcss-loader'),
  ]
}

/**
 * @see {Webpack.Module.Rule}
 */
declare namespace CSS {
  export type Patterns = Bud.Rule.Factory<Bud.Rule.Conditional>
  export type Exclude = Bud.Rule.Factory<Bud.Rule.Conditional>
  export type Loaders = Bud.Rule.Factory<Bud.Rule.Loader>
}
