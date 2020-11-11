import {Webpack} from '@roots/bud-typings'
import rules from './rules'

export const moduleBuilder: Framework.Build.Module = function (
  this: Framework.Bud,
  build: Framework.Build.Configuration,
): {module: Webpack.Configuration['module']} {
  return {
    module: this.hooks.filter<Webpack.Configuration['module']>(
      'webpack.module',
      {
        ...build.module,
        rules: rules.bind(this)(),
      },
    ),
  }
}
