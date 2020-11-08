import {Webpack} from '@roots/bud-typings'
import rules from './rules'

export const module: Framework.Build.Module = function (
  this: Framework.Bud,
  build: Framework.Build.Configuration,
): {module: Webpack.Configuration['module']} {
  return {
    module: this.hooks.filter('webpack.module', {
      ...build.module,
      rules: rules.bind(this)(),
    }) as Webpack.Configuration['module'],
  }
}
