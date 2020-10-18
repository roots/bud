export const general: Framework.Build.General = function (
  build: Partial<Framework.Build.Configuration>,
) {
  return {
    mode: this.hooks.filter('build.mode', build.mode),
    node: this.hooks.filter('build.node', build.node),
    stats: this.hooks.filter('build.stats', build.stats),
    target: this.hooks.filter('build.target', build.target),
    watch: this.hooks.filter('build.watch', build.watch),
    context: this.hooks.filter('build.context', build.context),

    devtool: this.hooks.filter(
      'build.devtool',
      build.devtool ?? false,
    ),
  }
}
