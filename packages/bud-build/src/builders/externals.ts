export const externals: Framework.Build.Externals = function ({
  externals,
}) {
  return {
    externals: this.hooks.filter('webpack.externals', externals),
  }
}
