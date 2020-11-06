export const resolve: Framework.Build.Resolve = function ({
  resolve,
  context,
}) {
  return {
    resolve: {
      alias: this.hooks.filter(
        'webpack.resolve.alias',
        resolve.alias,
      ),

      extensions: this.hooks.filter(
        'webpack.resolve.extensions',
        resolve.extensions,
      ),

      modules: this.hooks.filter('webpack.resolve.modules', [
        resolve.modules ?? context,
        this.disk.get('project').getBase(),
        this.fs.path.resolve(
          this.disk.get('@roots').getBase(),
          '../node_modules',
        ),
      ]),
    },
  }
}
