import rules from './rules'
import Webpack from 'webpack'

function module(
  build: Build.Configuration,
): Framework.Index<Partial<Webpack.Module>> {
  return {
    module: this.hooks.filter('build.module', {
      ...build.module,
      rules: rules.bind(this)(),
    }),
  }
}

export {module as default}
