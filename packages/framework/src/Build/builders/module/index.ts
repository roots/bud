import rules from './rules'

export const module: Framework.Build.Module = function (
  this: Framework.Bud,
  build: Framework.Build.Configuration,
): {module: Framework.Webpack.Module} {
  return {
    module: this.hooks.filter('webpack.module', {
      ...build.module,
      rules: rules.bind(this)(),
    }),
  }
}
