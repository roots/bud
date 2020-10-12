import rules from './rules'
import Webpack from 'webpack'

export const module = function (
  this: Framework.Bud,
  build: Build.Configuration,
): Framework.Index<Partial<Webpack.Module>> {
  return {
    module: this.hooks.filter('build.module', {
      ...build.module,
      rules: rules.bind(this)(),
    }),
  }
}
