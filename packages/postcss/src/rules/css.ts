/* import {Build} from '@roots/bud-framework'
import Webpack from 'webpack'

declare namespace PostCSS {
  export type Loaders = Build.Rule.Factory<Webpack.RuleSetRule[]>
}

export const use: PostCSS.Loaders = (bud, loader) => {
  return [
    this.mode.is('production')
      ? use('minicss-loader')
      : use('style-loader'),
    use('css-loader'),
    use('resolve-url-loader'),
  ]
}
 */
