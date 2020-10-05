import type Bud from '../../Bud'
import Webpack from 'webpack'

/**
 * @see {Webpack.Module.Rule}
 */
declare namespace CSS {
  export type Patterns = Bud.Build.Rule.Factory<
    Bud.Build.Rule.Conditional
  >

  export type Exclude = Bud.Build.Rule.Factory<
    Bud.Build.Rule.Conditional
  >

  export type Loaders = Bud.Build.Rule.Factory<
    Webpack.RuleSetRule[]
  >
}

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
  const use = (loader: string): Bud.Build.Rule.Product =>
    this.components['uses'].get(loader).make()

  return [
    this.mode.is('production')
      ? use('minicss-loader')
      : use('style-loader'),
    use('css-loader'),
    use('resolve-url-loader'),
  ]
}
