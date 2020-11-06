export const general: Framework.Build.General = function ({
  mode,
  node,
  stats,
  target,
  watch,
  context,
  devtool,
}) {
  return {
    mode: this.hooks.filter('webpack.mode', mode),
    node: this.hooks.filter('webpack.node', node),
    stats: this.hooks.filter('webpack.stats', stats),
    target: this.hooks.filter('webpack.target', target),
    watch: this.hooks.filter('webpack.watch', watch),
    context: this.hooks.filter('webpack.context', context),
    devtool: this.hooks.filter(
      'webpack.devtool',
      devtool ?? false,
    ),
  }
}
