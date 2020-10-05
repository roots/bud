import Bud from '../../Bud'
import rules from './rules'
import Webpack from 'webpack'

function module(
  build: Bud.Build.Configuration,
): Bud.Index<Partial<Webpack.Module>> {
  return {
    module: this.hooks.filter('build.module', {
      ...build.module,
      rules: rules.bind(this)(),
    }),
  }
}

export {module as default}
