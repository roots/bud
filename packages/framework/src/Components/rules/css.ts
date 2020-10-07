import type Bud from '../../Bud'
import Webpack from 'webpack'

/**
 * CSS Module
 *
 * @see {Webpack.Module.Rule}
 */
declare namespace CSS {
  export type Patterns = Build.Rule.Factory<
    Build.Rule.Conditional
  >

  export type Exclude = Build.Rule.Factory<
    Build.Rule.Conditional
  >

  export type Loaders = Build.Rule.Factory<Webpack.RuleSetRule[]>
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
 * {@see Use}
 */
export const use: CSS.Loaders = function (this: Bud) {
  const use = (loader: string): Build.Rule.Product =>
    this.components['uses'].get(loader).make()

  return [
    this.mode.is('production')
      ? use('minicss-loader')
      : use('style-loader'),
    use('css-loader'),
    use('resolve-url-loader'),
  ]
}
